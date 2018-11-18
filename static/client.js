let root = document.getElementById('root');

class UserInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {

	}

	handleSubmit(e) {
		alert('good work');
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					you say:
					<input type="text" value={this.props.value} onChange={this.HandleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		)
	}
}

function ChatHistory(props) {
	const chats = props.chats;
	const listChats = chats.map((chat) =>
		<li key={chat.date}>
			{chat.text}
		</li>
	);
	console.log(listChats);
	return (
		<ul>{listChats}</ul>
	)
}

let oldChats = [
	{date: (new Date(Date.now())), text: "hi, this is travis"}
]

class ChatBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<UserInput value="" />
				<ChatHistory chats={oldChats} />
			</div>
		)
	}
}

function UserList(props) {
	const users = props.users;
	const listUsers = users.map((user) =>
		<li key={user.id}>
			{user.handle + " " + user.joinTime}
		</li>
	);
	return (
		<ul>{listUsers}</ul>
	)
}

class UserBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<UserList users={this.props.users} />
		)
	}
}

let allUsers = [
	{id: 0, handle: 'kiddspazz', joinTime: "10:30pm"}
]

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<UserBox users={allUsers} />
				<ChatBox />
			</div>
		)
	}
}

ReactDOM.render(<App />, root);
