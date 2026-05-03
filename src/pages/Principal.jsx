import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

function Principal() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUsuario(docSnap.data());
        }
        setCarregando(false);
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (carregando) {
    return <div className="container"><p>Carregando...</p></div>;
  }

  return (
    <div className="container">
      <h1>Página Principal</h1>
      {usuario ? (
        <div className="dados-usuario">
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>Sobrenome:</strong> {usuario.sobrenome}</p>
          <p><strong>Data de Nascimento:</strong> {usuario.dataNascimento}</p>
        </div>
      ) : (
        <p>Nenhum dado encontrado.</p>
      )}
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Principal;
