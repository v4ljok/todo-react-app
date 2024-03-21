import './app-header.css';

function AppHeader({toDo,done}) {
    return (
        <div className='app-header d-flex'>
            <h1>Todo List</h1>
            <h2>{done} done, {toDo} more to do</h2>
        </div>
    );
}

export default AppHeader;