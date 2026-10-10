let root = document.getElementById('root');
// The page may live under a path (www.travish.com/chat/) or at the root
// (localhost:8081/); its live connection lives beside it either way.
let base = window.location.pathname.replace(/\/[^/]*$/, '');
let socket = io({path: base + '/socket.io'});

function clock(time) {
	return new Date(time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
}

class TextForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({value: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		let value = this.state.value.trim();
		if (value === '') {return};
		this.props.onSubmit(value);
		this.setState({value: ''});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					{this.props.label}
					<input type="text" value={this.state.value} onChange={this.handleChange} maxLength={this.props.maxLength} autoFocus />
				</label>
				<input type="submit" value={this.props.button} />
			</form>
		)
	}
}

function ChatHistory(props) {
	const listChats = props.chats.map((chat, i) =>
		<li key={i}>
			{`${clock(chat.timeStamp)} ${chat.user}: ${chat.body}`}
		</li>
	);
	return (
		<ul>{listChats}</ul>
	)
}

function UserList(props) {
	const listUsers = props.users.map((user) =>
		<li key={user.id}>
			{user.name + " (joined " + clock(user.joinTime) + ")"}
		</li>
	);
	return (
		<ul>{listUsers}</ul>
	)
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {users: [], messages: [], notices: [], wantedName: null, error: ''};
		this.join = this.join.bind(this);
		this.say = this.say.bind(this);
	}

	componentDidMount() {
		socket.on('status', (users) => this.setState({users: users}));
		socket.on('message', (data) => {
			if (Array.isArray(data)) {
				this.setState({messages: data});
			} else {
				let notice = {body: data, user: 'THE SERVER', timeStamp: new Date().toISOString()};
				this.setState({notices: [notice].concat(this.state.notices)});
			}
		});
		// after a dropped connection the server has forgotten us: join again
		socket.on('connect', () => {
			if (this.state.wantedName) {this.join(this.state.wantedName)};
		});
	}

	join(name) {
		this.setState({wantedName: name, error: ''});
		// the server only answers when the name is refused
		socket.emit('message', {name: name}, (error) => {
			this.setState({wantedName: null, error: `${error}try another`});
		});
	}

	say(text) {
		socket.emit('message', text);
	}

	render() {
		let me = this.state.users.find((user) => user.id === socket.id);
		let chats = this.state.messages.concat(this.state.notices)
			.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));

		return (
			<div>
				<h2>who's here</h2>
				<UserList users={this.state.users} />
				{me
					? <TextForm key="say" label={`${me.name} says: `} button="Send" maxLength={500} onSubmit={this.say} />
					: <TextForm key="join" label="your name: " button="Join" maxLength={24} onSubmit={this.join} />}
				<p className="error">{this.state.error}</p>
				<ChatHistory chats={chats} />
			</div>
		)
	}
}

ReactDOM.render(<App />, root);
