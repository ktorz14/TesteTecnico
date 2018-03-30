import * as React from 'react';
import * as Modal from 'react-modal';
import { CreateEdit } from '../CreateEdit/CreateEditModal'
import { RouteComponentProps } from 'react-router';
import * as Livro from '../../Model/livro';

enum ModalState {
    create = 1,
    edit = 2,
    noModal = 3
}

interface LivroState {
    livro: Livro.Livro[]
    loading: boolean,
    modalState: ModalState,
    activeId: number
}

export class Livros extends React.Component<RouteComponentProps<{}>, LivroState>{

    //#region Constructor

    constructor(props) {
        super(props);
        this.state = {
            livro: [],
            loading: true,
            modalState: ModalState.noModal,
            activeId: 0
        };

    //#endregion Constructor

    fetch('api/Livro/Get')
        .then(response => response.json() as Promise<Livro.Livro[]>)
        .then(data => {
            this.setState({
                livro: data,
                loading: false,
            });
        });
    }

    //#region Render

    public render() {

        this.renderPopup();

        let contents = this.state.loading
            ? <p> Loading ... </p>
            : this.renderTable(this.state.livro);

        return <div>
            <h1> Livros </h1>
            <button className="action" onClick={this.handleCreate.bind(this)}>Create</button>    
            {contents}
        </div>;
    }


    private renderTable(livros: Livro.Livro[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Nº of Pages</th>
                </tr>
            </thead>
            <tbody>
                {livros.map((item,i) =>
                    <tr key={i}>
                        <td>
                            <button className="action btn btn-danger"  onClick={(id) => this.handleDelete(item.id)}></button>
                            <button className="action btn btn-success" onClick={(id) => this.handleEdit(item.id)}></button>
                        </td>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{item.numPage}</td>
                    </tr>
                )}
            </tbody>
        </table>
    }


    private renderPopup() {
        if (this.state.modalState == ModalState.noModal)
            return null
        return <Modal
            isOpen={true}
            contentLabel="crawl">
            <button onClick={this.closeModal.bind(this)} className="action" title="Close"></button>
            {this.renderPopupContent()}
            </Modal>
    }

    private renderPopupContent() {
        switch (this.state.modalState) {
            case ModalState.create:
                return <CreateEdit id={null} dbaction="create" 
                    onSave={this.handlePopupSave.bind(this)}/>
            case ModalState.edit:
                return <CreateEdit id={this.state.activeId} dbaction="edit"
                    onSave={this.handlePopupSave.bind(this)} />
        }
    }

    //#endregion


    //#region Handlers

    handleCreate() {
        this.setState({ modalState: ModalState.create })
    }

    handleEdit(id: number) {
        this.setState({ modalState: ModalState.edit })
    }

    handleDelete(id: number) {
        if (!confirm('Deseja realmente excluir o registro ?'))
            return
        fetch('api/Livro/Delete' + id, { method: 'delete' })
            .then(data => {
                this.setState(
                    {
                        livro: this.state.livro.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
    }

    closeModal() {
        this.setState({ modalState: ModalState.noModal });
    }

    handlePopupSave(success: boolean) {
        if (success)
            this.setState({ modalState: ModalState.noModal });
    }

    //#endregion

}

