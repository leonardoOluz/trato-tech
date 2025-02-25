import Header from "components/Header";
import styles from "./Anuncie.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Botao from "components/Botao";
import { useForm } from "react-hook-form";
import { adicionarItem } from "store/reducers/itens";
export default function Anuncie() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      categoria: "",
    },
  });
  const categorias = useSelector((state) =>
    state.categorias.map(({ id, nome }) => ({ id, nome }))
  );
  const dispatch = useDispatch();
  const cadastrar = (valores) => {
    dispatch(adicionarItem(valores));
  };

  const { errors } = formState;
  return (
    <div className={styles.container}>
      <Header
        titulo="Anuncie aqui"
        descricao="Anuncie seus produtos no melhor site do Brasil"
      />
      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
        <input
          {...register("titulo", { required: "Campo obrigatório" })}
          placeholder="Titulo do produto"
          alt="Titulo do produto"
          className={errors.titulo ? styles["input-erro"] : ""}
        />
        {errors.titulo && (
          <span className={styles["mensagem-erro"]}>
            {" "}
            {errors.titulo.message}{" "}
          </span>
        )}
        <input
          {...register("descricao", { required: "Campo obrigatório" })}
          placeholder="Descrição do produto"
          alt="Descrição do produto"
          className={errors.descricao ? styles["input-erro"] : ""}
        />
        {errors.descricao && (
          <span className={styles["mensagem-erro"]}>
            {" "}
            {errors.descricao.message}{" "}
          </span>
        )}
        <input
          {...register("imagem", { required: "Campo obrigatório" })}
          placeholder="URL da imagem do produto"
          alt="URL da imagem do produto"
          className={errors.imagem && styles["input-erro"]}
        />
        {errors.imagem && (
          <span className={styles["mensagem-erro"]}>
            {" "}
            {errors.imagem.message}{" "}
          </span>
        )}
        <select
          {...register("categoria", { required: "selecione uma categoria" })}
          className={errors.categoria && styles["input-erro"]}
        >
          <option disabled value="">
            Selecione uma categoria
          </option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        {errors.categoria && (
          <span className={styles["mensagem-erro"]}>
            {" "}
            {errors.categoria.message}{" "}
          </span>
        )}
        <input
          {...register("preco", {
            required: "coloque um valor de preço valido",
          })}
          type="number"
          placeholder="Valor do produto"
          className={errors.preco && styles["input-erro"]}
        />
        {errors.preco && (
          <span className={styles["mensagem-erro"]}>
            {" "}
            {errors.preco.message}{" "}
          </span>
        )}
        <Botao type="submit">Cadastrar produto</Botao>
      </form>
    </div>
  );
}
