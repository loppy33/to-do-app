const root = ReactDOM.createRoot(
    document.getElementById('root')
);


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            items: [
                {
                    text: 'Погулять',
                    id: '3892459825293420',
                },

                {
                    text: 'Попить водички',
                    id: '5464367769876978976',
                },

                {
                    text: 'Пойти в кино',
                    id: '345325342342542356',
                },
            ]
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state.text)
        let newItem = {
            text: this.state.text,
            id: Date.now()
        }
        this.setState(function (state) {
            let currentItems = state.items
            currentItems.push(newItem)

            return {
                items: currentItems,
                text: ''
            }
            
        })
    }

    handleClear() {
        this.setState({ items: [] })
    }

    handleRemove(id) {
        console.log(id)
        this.setState(function(state) {
            let currentItems = state.items
            currentItems.splice(id, 1)
            
            return {
                items: currentItems
            }

        })
    
    }

    render() {
        return <form className='userForm' id='userForm' onSubmit={(e) => this.handleSubmit(e)}>
            <ol>
                {
                    this.state.items.map((item, id) => (
                        <li key={item.id}>{item.text} <button type='button' onClick= {() => this.handleRemove(id)} className='delete' style = {{backgroundColor: 'none' + ' !important'}}>🗑️</button></li>
                    ))
                }
            </ol>
            <input placeholder="Введите дело" type="text" onChange={(e) => this.setState({ text: e.target.value })} value={this.state.text} />
            <button disabled={this.state.text.length > 0 ? (this.state.text.length < 15 ? false : true) :  true}>Добавить</button>
            <button disabled={this.state.items.length > 0 ? false : true} type='button' onClick={() => this.handleClear()} >Очистить</button>
        </form>
    }
}

root.render(<App />);



// 