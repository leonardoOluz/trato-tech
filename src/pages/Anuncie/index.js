import Header from "components/Header";
import styles from "./Anuncie.module.scss";
import { useSelector } from "react-redux";
import Botao from "components/Botao";
import { useForm } from "react-hook-form";
export default function Anuncie() {
  const { register, handleSubmit } = useForm();
  const categorias = useSelector((state) =>
    state.categorias.map(({ id, nome }) => ({ id, nome }))
  );
  const cadastrar = (valores) => {
    console.log(valores);
  };

  return (
    <div className={styles.container}>
      <Header
        titulo="Anuncie aqui"
        descricao="Anuncie seus produtos no melhor site do Brasil"
      />
      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
        <input
          {...register("nome")}
          placeholder="Nome do produto"
          alt="Nome do produto"
        />
        <input
          {...register("descricao")}
          placeholder="Descrição do produto"
          alt="Descrição do produto"
        />
        <input
          {...register("imagem")}
          placeholder="URL da imagem do produto"
          alt="URL da imagem do produto"
        />
        <select {...register("categoria")}>
          <option disabled value="">
            Selecione uma categoria
          </option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        <input
          {...register("preco")}
          type="number"
          placeholder="Valor do produto"
        />
        <Botao type="submit">Cadastrar produto</Botao>
      </form>
    </div>
  );
}
