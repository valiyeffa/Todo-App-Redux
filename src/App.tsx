import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { infoType } from './todo.modal';
import { add, delText, edit } from './slices/todoApp';
import supabase from './utils/supabase';
import store from './store';

const App: React.FC = () => {

  const todos = useSelector((p: any) => p.todo)
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editText, setEditText] = useState<string>('');

  const submitedForm = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(add(inputRef.current!.value));
    inputRef.current!.value = "";
  }

  const startEdit = (id: string | number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id: string | number) => {
    dispatch(edit({ id, text: editText }));
    setEditingId(null);
    setEditText('');
  };

  const listData = async () => {
    const { data, error }: any = await supabase.from('TodoApp').select();
    if (error) {
      console.log(error);
    } else {
      store.dispatch(dataRead(data))
    }
  }

  return (
    <div className='d-flex align-items-center justify-content-center flex-column'>
      <h1 className='my-5'>Todo App</h1>

      <div className="col-5">
        <form onSubmit={submitedForm}>
          <div className="input-group mb-3">
            <input ref={inputRef} type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button className="btn btn-dark" type="submit" id="button-addon2">Add</button>
          </div>
        </form>

        <ul className="list-group">
          {todos.map((item: infoType, index: number) => (
            <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
              {editingId === item.id ? (
                <input type="text" className="form-control" value={editText} onChange={(e) => setEditText(e.target.value)} />
              ) : (
                <div>{item.text}</div>
              )}
              <div>
                {editingId === item.id ? (
                  <>
                    <button className="btn btn-success mx-2" onClick={() => saveEdit(item.id)}>Save</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-warning mx-2" onClick={() => startEdit(item.id, item.text)}>Edit</button>
                    <button className='btn btn-danger' onClick={() => dispatch(delText(item.id))}>DEL</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App