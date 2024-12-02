import React, { useState, useEffect } from "react";
import { UserService } from "../services/UserService";
import { TrashIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import Modal from "react-modal";
import { useLocation } from "react-router-dom"; // Importação para pegar o estado da navegação

// Modal para Criar/Editar Usuário
const UserFormModal = ({ user, onSave, onClose }) => {
  const [nome, setNome] = useState(user?.nome || "");
  const [salario, setSalario] = useState(user?.salario || "");
  const [valorEmpresa, setValorEmpresa] = useState(user?.valor_empresa || "");

  const handleSubmit = () => {
    onSave({ id: user?.id, nome, salario, valor_empresa: valorEmpresa });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">{user ? "Editar Usuário" : "Novo Usuário"}</h2>
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-bold">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-bold">Salário</label>
          <input
            type="number"
            value={salario}
            onChange={(e) => setSalario(Number(e.target.value))}
            className="border w-full p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-bold">Valor Empresa</label>
          <input
            type="number"
            value={valorEmpresa}
            onChange={(e) => setValorEmpresa(Number(e.target.value))}
            className="border w-full p-2 rounded"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancelar
        </button>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
          Salvar
        </button>
      </div>
    </div>
  );
};

// Modal de Confirmação de Exclusão
const DeleteConfirmation = ({ users, onDelete, onClose }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Confirmar exclusão</h2>
      <p>
        Tem certeza que deseja excluir{" "}
        <b>{users.length === 1 ? `o cliente ${users[0].nome}` : `${users.length} clientes`}?</b>
      </p>
      <div className="flex justify-end mt-4 space-x-2">
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancelar
        </button>
        <button
          onClick={() => onDelete(users.map((u) => u.id))}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

// Componente Principal
const UserList = () => {
  const location = useLocation(); // Obtendo o estado da navegação
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage, setClientsPerPage] = useState(16);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [modalType, setModalType] = useState(null); // 'create', 'update', 'delete'
  const [modalData, setModalData] = useState(null);

  const username = location.state?.username || "Usuário"; // Pega o nome do estado passado ou exibe "Usuário"

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await UserService.getAllUsers();
        setUsers(userData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSaveUser = async (user) => {
    try {
      if (user.id) {
        await UserService.updateUser(user.id, user);
        setUsers(users.map((u) => (u.id === user.id ? user : u)));
      } else {
        const newUser = await UserService.createUser(user);
        setUsers([...users, newUser]);
      }
      closeModal();
    } catch (err) {
      console.error("Erro ao salvar cliente:", err);
    }
  };

  const handleDeleteUsers = async (ids) => {
    try {
      await Promise.all(ids.map((id) => UserService.deleteUser(id)));
      setUsers(users.filter((user) => !ids.includes(user.id)));
      setSelectedUsers([]);
      closeModal();
    } catch (err) {
      console.error("Erro ao excluir clientes:", err);
    }
  };

  const toggleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const openModal = (type, data = null) => {
    setModalType(type);
    setModalData(data);
  };

  const closeModal = () => {
    setModalType(null);
    setModalData(null);
  };

  const handleLogout = () => {
    // Limpar sessão (por exemplo, removendo dados do localStorage ou cookies)
    localStorage.removeItem("username"); // Exemplo de remoção de um item de sessão
    navigate("/");
  };

  const totalPages = Math.ceil(users.length / clientsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * clientsPerPage,
    currentPage * clientsPerPage
  );

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar clientes.</div>;

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-orange-500 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Teddy Open Finance</h1>
        <nav className="space-y-4">
          <button className="block py-2 px-4 rounded hover:bg-orange-600">
            Clientes
          </button>
          <button className="block py-2 px-4 rounded hover:bg-orange-600">
            Clientes selecionados
          </button>
          <button
            onClick={handleLogout} // Adiciona a funcionalidade de logout
            className="block py-2 px-4 rounded hover:bg-orange-600"
          >
            Sair
          </button>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-4">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Olá, {username}!</h2> {/* Exibe o nome do usuário */}
          <div className="flex space-x-2">
            <select
              value={clientsPerPage}
              onChange={(e) => setClientsPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {[8, 16, 32].map((option) => (
                <option key={option} value={option}>
                  {option} por página
                </option>
              ))}
            </select>
            <button
              onClick={() => openModal("create")}
              className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Novo Usuário
            </button>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-4">
          {paginatedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded p-4 flex flex-col space-y-2"
            >
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => toggleSelectUser(user.id)}
              />
              <h3 className="font-bold text-lg">{user.nome}</h3>
              <p>Salário: R${user.salario.toLocaleString("pt-BR")}</p>
              <p>Empresa: R${user.valor_empresa.toLocaleString("pt-BR")}</p>
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => openModal("update", user)}
                  className="text-blue-500"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => openModal("delete", [user])}
                  className="text-red-500"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          {selectedUsers.length > 0 && (
            <button
              onClick={() => openModal("delete", users.filter((u) => selectedUsers.includes(u.id)))}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Excluir Selecionados
            </button>
          )}
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      </main>

      {modalType && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          {modalType === "create" || modalType === "update" ? (
            <UserFormModal
              user={modalData}
              onSave={handleSaveUser}
              onClose={closeModal}
            />
          ) : modalType === "delete" ? (
            <DeleteConfirmation
              users={modalData}
              onDelete={handleDeleteUsers}
              onClose={closeModal}
            />
          ) : null}
        </Modal>
      )}
    </div>
  );
};

export default UserList;
