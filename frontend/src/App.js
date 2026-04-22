import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pessoas, setPessoas] = useState([]);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:8080/pessoas";

  const carregar = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setPessoas(data);
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async () => {
    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({ nome: "", email: "", telefone: "" });
    setEditId(null);
    carregar();
  };

  const editar = (p) => {
    setForm(p);
    setEditId(p.id);
  };

  const excluir = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    carregar();
  };

  return (
    <div className="container">
      <h2>CRUD Pessoa</h2>

      <input
        placeholder="Nome"
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Telefone"
        value={form.telefone}
        onChange={(e) => setForm({ ...form, telefone: e.target.value })}
      />

      <button className="btn-primary" onClick={salvar}>
        {editId ? "Atualizar" : "Cadastrar"}
      </button>

      <div className="lista">
        {pessoas.map((p) => (
          <div className="item" key={p.id}>
            <span>
              {p.nome} - {p.email} - {p.telefone}
            </span>

            <div>
              <button className="btn-edit" onClick={() => editar(p)}>
                Editar
              </button>

              <button className="btn-delete" onClick={() => excluir(p.id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;