const root = ReactDOM.createRoot(
    document.getElementById('root')
);


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalClassList: 'modal',
            text: '',
            editedText: '',
            buttonClassList: '',
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
            ],
            editedItemId: null
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
        this.setState(function (state) {
            let currentItems = state.items
            currentItems.splice(id, 1)

            return {
                items: currentItems
            }

        })
    }

    handleEdit(id, text) {
        this.setState({
            modalClassList: 'modal modalShow',
            editedItemId: id,
            editedText: text
        })
    }

    submitEdit(id) {
        let element = this.state.items[id]
        element.text = this.state.editedText
        
        this.setState({
            modalClassList: 'modal'
        })
    }

    render() {
        return (
            <div>
                <div className={this.state.modalClassList}>
                    <form action="">
                        <h1>Edit</h1>
                        <input type="text" placeholder='Введите новое дело' onChange={(e) => this.setState({ editedText: e.target.value })} value={this.state.editedText} />
                        <button style={{ cursor: this.state.editedText.length > 15 ? 'not-allowed' : (this.state.editedText.length == 0 ? 'not-allowed' : 'pointer' )}} type='button' onClick={() => this.submitEdit(this.state.editedItemId)} disabled={this.state.editedText.length > 0 ? (this.state.editedText.length < 15 ? false : true) : true}>Редактировать</button>
                    </form>
                </div>
                <form className='userForm' id='userForm' onSubmit={(e) => this.handleSubmit(e)}>
                    <ol>
                        {
                            this.state.items.map((item, id) => (
                                <li key={item.id}>{item.text} <button type='button' onClick={() => this.handleRemove(id)} className='delete' style={{ backgroundColor: 'none' + ' !important' }}>🗑️</button><button type='button' onClick={() => this.handleEdit(id, item.text)} className='edit'>✏️</button></li>
                            ))
                        }
                    </ol>
                    <input placeholder="Введите дело" type="text" onChange={(e) => this.setState({ text: e.target.value })} value={this.state.text} />
                    <button disabled={this.state.items.length > 0 ? false : true} type='button' onClick={() => this.handleClear()} >Очистить</button>
                    <button style={{ cursor: this.state.text.length > 15 ? 'not-allowed' : (this.state.text.length == 0 ? 'not-allowed' : 'pointer' )}} disabled={this.state.text.length > 0 ? (this.state.text.length < 15 ? false : true) : true}>Добавить</button>
                </form>
            </div>
        )

    }
}

root.render(<App />);



// 