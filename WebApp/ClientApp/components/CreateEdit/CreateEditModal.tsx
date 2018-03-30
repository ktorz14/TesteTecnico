import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Livro } from '../../Model/livro'

interface CreateEditState {
    livro: Livro;
    loading: boolean;
    save: boolean
}
interface CreateEditProps {
    id: number
    dbaction: string
    onSave?: any
}

export class CreateEdit extends React.Component<CreateEditProps, CreateEditState> {
    constructor(props){
   super(props);
    if (this.props.dbaction == "edit") {
        this.state = { livro: null, loading: true, save: false }
			fetch('api/Livro/' + this.props.id, {method: 'get' })
                .then(response => response.json() as Promise<Livro>)
                .then(data => {
            this.setState({ livro: data, loading: false });
        });
        } else
			this.state = {livro: null, loading: false, save: false}

    }

    handleSave(e) {
        e.preventDefault()
        let method: string = (this.props.dbaction == "edit" ? "Update" : "Insert")
        let form: Element = document.querySelector('#frmCreateEdit')
        let id = document.getElementById('Id') as HTMLInputElement
        fetch('api/Livro/' + method,
            {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.formToJson(form))
            }).then(data => {
                this.setState({ save: false });
                this.props.onSave(true);
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p> Loading ... </p>
            : this.renderForm(this.state.livro);
        return <div>
            <h1>{this.props.dbaction == "edit" ? "Edit Actor" : "Create Action"}</h1>
            {contents}
        </div>;
    }

    private renderForm(item: Livro) {
        if (this.props.dbaction != "edit")
            item = new Livro()
        return <form id='frmCreateEdit'>
            <label>Id</label>
            <input id='Id' name='Id' type='number' />
            <label>Title</label>
            <input id='Title' name='Title' type='text' defaultValue={item.title != null ? (item.title + '') : ''} />
            <label>Author</label>
            <input id='Author' name='Author' type='text' defaultValue={item.author != null ? (item.author + '') : ''} />
            <label>Numero de Paginas</label>
            <input id='NumPag' name='NumPag' type='number'  />
            </form>
    }

    formToJson = elements => [].reduce.call(elements, (data, element) => {
        console.log('formToJson()', element)
        
            data[element.name] = element.value;
            
        return data;
    }, {});

}