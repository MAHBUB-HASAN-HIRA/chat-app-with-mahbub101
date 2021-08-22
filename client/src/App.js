import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						<Join />
					</Route>
					<Route path="/chat">
						<Chat />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
