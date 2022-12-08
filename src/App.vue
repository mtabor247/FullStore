<script>
import axios from "axios";

export default {
  data() {
    return {
      //Metodos get
      producto: null,
      categorias: null,
      marcas: null,
      //id_marca : 1,
      // id_categoria : 1,

      //
      nombre: "Polo",
      categoria: null,
      marca: null,
      color: "Rojo",
      talla: "M",
      precio: 123,
      stock: 100,
      estado: 1,

      // Inputs
      nombre_input: "",
      categoria_input: 1,
      marca_input: 1,
      color_input: "",
      talla_input: "",
      precio_input: "",
      stock_input: "",
      estado_input: 1,

      //EDITAR
      codigo_editar: null,
      nombre_editar: null,
      categoria_editar: null,
      marca_editar: null,
      color_editar: null,
      talla_editar: null,
      precio_editar: null,
      stock_editar: null,
      estado_editar: null,
    };
  },
  mounted() {
    this.getProducto();
    this.getCategoria();
    this.getMarca();
  },
  methods: {
    getProducto() {
      axios
        .get("http://192.168.1.49:9999/fullstore/producto")
        .then((result) => {
          //Aqui recepcionar los datos
          this.producto = result.data;
          // console.log(result.data);
        });
    },
    getCategoria() {
      axios
        .get("http://192.168.1.49:9999/fullstore/categoria")
        .then((result) => {
          this.categorias = result.data;
          // console.log(result.data);
        });
    },
    getMarca() {
      axios.get("http://192.168.1.49:9999/fullstore/marca").then((result) => {
        this.marcas = result.data;
        // console.log(result.data);
      });
    },
    extraer_marca(){
         let marca_seleccionada;

        for(let i = 0; i < this.marcas.length; i++){
          if(this.marcas[i].id_marca === this.marca_input){
            marca_seleccionada = this.marcas[i];
          }
        }

        this.marca_input = marca_seleccionada;
        console.log(this.marca_input)
    },
    extraer_categoria(){
      let categoria_seleccionada;

      for(let i = 0; i < this.categorias.length; i++){
        if(this.categorias[i].id_categoria === this.categoria_input){
          categoria_seleccionada = this.categorias[i];
        }
      }
      this.categoria_input = categoria_seleccionada;
      // console.log(this.categoria_input)
    },

    validar_informacion() {
      axios
        .post("http://192.168.1.49:9999/fullstore/producto", {
          nombre: this.nombre_input,
          categoria: this.categoria_input,
          marca: this.marca_input,
          color: this.color_input,
          talla: this.talla_input,
          precio: this.precio_input,
          stock: this.stock_input,
          estado: this.estado_input,
        })
        .then((result) => {
          alert("Datos correctamente ingresados");
          window.location.reload();
        })
        .catch((error) => {
          alert("No se ha podido ingresar los datos");
          console.log(error);
        });

      // if (
      //   this.nombre_input == this.nombre &&
      //   this.categoria_input == this.categoria &&
      //   this.marca_input == this.marca &&
      //   this.color_input == this.color &&
      //   this.talla_input == this.talla &&
      //   this.precio_input == this.precio &&
      //   this.stock_input == this.stock &&
      //   this.estado_input == this.estado
      // ) {
      //   alert("Datos correctamente ingresados");
      // } else {
      //   alert("No se ha podido ingresar los datos");
      // }
    },

    eliminar_elemento(codigo) {
      axios
        .delete("http://192.168.1.49:9999/fullstore/producto/" + codigo)
        .then((result) => {
          alert("El producto se ha eliminado satisfactoriamente");
          console.log(result);
          window.location.reload();
        })
        .catch((error) => {
          alert("El producto NO se ha eliminado");
          console.log(error);
        });
    },
    editar_categoria(){
      let categoria_seleccionada;

      for(let i = 0; i < this.categorias.length; i++){
        if(this.categorias[i].id_categoria === this.categoria_editar){
          categoria_seleccionada = this.categorias[i];
        }
      }
      this.categoria_editar = categoria_seleccionada;
      // console.log(this.categoria_editar)
    },
    editar_marca(){
         let marca_seleccionada;

        for(let i = 0; i < this.marcas.length; i++){
          if(this.marcas[i].id_marca === this.marca_editar){
            marca_seleccionada = this.marcas[i];
          }
        }

        this.marca_editar = marca_seleccionada;
        console.log(this.marca_editar)
    },
    editar_elemento(
      codigo,
      nombre,
      categoria,
      marca,
      color,
      talla,
      precio,
      stock,
      estado
    ) {
      this.codigo_editar = codigo;
      this.nombre_editar = nombre;
      this.categoria_editar = categoria;
      this.marca_editar = marca;
      this.color_editar = color;
      this.talla_editar = talla;
      this.precio_editar = precio;
      this.stock_editar = stock;
      this.estado_editar = estado;
    },
    guardar() {
      axios
        .put(
          "http://192.168.1.49:9999/fullstore/producto/" + this.codigo_editar,
          {
            nombre: this.nombre_editar,
            categoria: this.categoria_editar,
            marca: this.marca_editar,
            color: this.color_editar,
            talla: this.talla_editar,
            precio: this.precio_editar,
            stock: this.stock_editar,
            estado: this.estado_editar,
          }
        )
        .then((result) => {
          alert("El producto se ha editado satisfactoriamente");
          console.log(result);
          window.location.reload();
        })
        .catch((error) => {
          alert("El producto NO se ha editado");
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-dark bg-dark" id="app">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="./assets/logo_full.svg" alt="" width="160" />
      </a>
    </div>
    <div class="d-flex me-4">
      <select
        style="color: #ffff"
        class="form-select bg-dark"
        v-model="$i18n.locale"
      >
        <option
          style="color: #ffff"
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
        >
          {{ locale }}
        </option>
      </select>
    </div>
  </nav>

  <br /><br />

  <div class="card text-center m-4">
    <div class="card-header">{{ $t("titulo") }}</div>
    <div class="card-body">
      <div class="text-end">
        <button
          class="btn btn-danger mb-3"
          data-bs-toggle="modal"
          data-bs-target="#Agregar"
        >
          <i class="fa-solid fa-user-plus"></i> {{ $t("agregar") }}
        </button>
      </div>

      <table class="table">
        <thead class="table-dark">
          <tr>
            <td>id</td>
            <td>{{ $t("tabla.nombre") }}</td>
            <td>{{ $t("tabla.categoria") }}</td>
            <td>{{ $t("tabla.marca") }}</td>
            <td>{{ $t("tabla.color") }}</td>
            <td>{{ $t("tabla.talla") }}</td>
            <td>{{ $t("tabla.precio") }}</td>
            <td>stock</td>
            <td>{{ $t("tabla.estado") }}</td>
            <td>{{ $t("tabla.editar") }}</td>
            <td>{{ $t("tabla.eliminar") }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="element in producto" :key="element.codigo">
            <td>
              {{ element.codigo }}
            </td>
            <td>
              {{ element.nombre }}
            </td>
            <td>
              {{ element.categoria.nombre }}
            </td>
            <td>
              {{ element.marca.nombre }}
            </td>
            <td>
              {{ element.color }}
            </td>
            <td>
              {{ element.talla }}
            </td>
            <td>S/. {{ element.precio }}</td>
            <td>{{ element.stock }} Uds.</td>
            <td>{{ element.estado }}</td>
            <td>
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#Editar"
                v-on:click="
                  editar_elemento(
                    element.codigo,
                    element.nombre,
                    element.categoria,
                    element.marca,
                    element.color,
                    element.talla,
                    element.precio,
                    element.stock,
                    element.estado
                  )
                "
              >
                <i className="fa-solid fa-pen-to-square"></i>
                {{ $t("tabla.editar") }}
              </button>
            </td>
            <td>
              <button
                className="btn btn-danger"
                v-on:click="eliminar_elemento(element.codigo)"
              >
                <i className="fa-solid fa-trash-can"></i>
                {{ $t("tabla.eliminar") }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer text-muted">FullStore S.A.C.</div>
  </div>

  <!-- MODAL DE REGISTRAR PRODUCTO -->
  <div
    class="modal fade"
    id="Agregar"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="Agregar"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered
      "
    >
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title modal-titulo col-11 text-center" id="Agregar">
            <i class="fa-solid fa-book"></i> Agregar Producto
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <form class="modal-prestamo" action="#" method="post">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label">
                    Nombre:
                  </label>
                  <div class="input-modal">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nombre del Producto"
                      v-model="nombre_input"
                    />
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label">
                    Categoria:
                  </label>
                  <div class="input-modal">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-on:change="extraer_categoria"
                      v-model="categoria_input"
                    >
                      <option
                        v-for="elemento in categorias"
                        :key="elemento.id_categoria"
                        :value="elemento.id_categoria"
                      >
                        {{ elemento.nombre }}
                      </option>
                    </select>
                    <!-- <input
                      type="number"
                      class="form-control"
                      placeholder="Categoria"
                      v-model="categoria_input"
                    /> -->
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label"> Marca: </label>
                  <div class="input-modal">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-on:change="extraer_marca"
                      v-model="marca_input"
                    >
                      <option
                        v-for="elemento in marcas"
                        :key="elemento.id_marca"
                        :value="elemento.id_marca"
                      >
                        {{ elemento.nombre }}
                      </option>
                    </select>
                    <!-- <input
                      type="number"
                      class="form-control"
                      placeholder="Marca"
                      v-model="marca_input"
                    /> -->
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label"> Color: </label>
                  <div class="input-modal">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Marca"
                      v-model="color_input"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label"> Talla: </label>
                  <div class="input-modal">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Talla"
                      v-model="talla_input"
                    />
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label">
                    Precio:
                  </label>
                  <div class="input-modal">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Precio"
                      v-model="precio_input"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label"> Stock: </label>
                  <div class="input-modal">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Stock"
                      v-model="stock_input"
                    />
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label">
                    Estado:
                  </label>
                  <div class="input-modal">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Estado"
                      v-model="estado_input"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div
                  class="
                    d-grid
                    gap-2
                    col-6
                    mx-auto
                    col-xs-12 col-sm-12 col-md-6
                    mb-2
                    mt-4
                  "
                >
                  <button
                    class="btn btn-primary btn-confirmar"
                    type="button"
                    v-on:click="validar_informacion"
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            type="button"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- MODAL DE EDITAR -->
  <div
    class="modal fade"
    id="Editar"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="Editar"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered
      "
    >
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title modal-titulo col-11 text-center" id="Editar">
            <i class="fa-solid fa-book"></i> Editar Producto
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <form class="modal-prestamo" action="#" method="post">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-2">
                  <label for="documento" class="col-form-label"> id: </label>
                  <div class="input-modal">
                    <input
                      type="number"
                      class="form-control"
                      readonly
                      v-model="codigo_editar"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label">
                    Nombre:
                  </label>
                  <div class="input-modal">
                    <input
                      type="text"
                      class="form-control"
                      v-model="nombre_editar"
                    />
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label">
                    Categoria:
                  </label>
                  <div class="input-modal">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-on:change="editar_categoria"
                      v-model="categoria_editar"
                    >
                      <option
                        v-for="elemento in categorias"
                        :key="elemento.id_categoria"
                        :value="elemento.id_categoria"
                      >
                        {{ elemento.nombre }}
                      </option>
                    </select>
                    <!-- <input
                      type="number"
                      class="form-control"
                      v-model="categoria_editar"
                    /> -->
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label"> Marca: </label>
                  <div class="input-modal">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-on:change="editar_marca"
                      v-model="marca_editar"
                    >
                      <option
                        v-for="elemento in marcas"
                        :key="elemento.id_marca"
                        :value="elemento.id_marca"
                      >
                        {{ elemento.nombre }}
                      </option>
                    </select>
                    <!-- <input
                      type="number"
                      class="form-control"
                      v-model="marca_editar"
                    /> -->
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label"> Color: </label>
                  <div class="input-modal">
                    <input
                      type="text"
                      class="form-control"
                      v-model="color_editar"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label"> Talla: </label>
                  <div class="input-modal">
                    <input
                      type="text"
                      class="form-control"
                      v-model="talla_editar"
                    />
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label">
                    Precio:
                  </label>
                  <div class="input-modal">
                    <input
                      type="number"
                      class="form-control"
                      v-model="precio_editar"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label"> Stock: </label>
                  <div class="input-modal">
                    <input
                      type="number"
                      class="form-control"
                      v-model="stock_editar"
                    />
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6">
                  <label for="documento" class="col-form-label">
                    Estado:
                  </label>
                  <div class="input-modal">
                    <input
                      type="number"
                      class="form-control"
                      v-model="estado_editar"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div
                  class="
                    d-grid
                    gap-2
                    col-6
                    mx-auto
                    col-xs-12 col-sm-12 col-md-6
                    mb-2
                    mt-4
                  "
                >
                  <button
                    class="btn btn-primary btn-confirmar"
                    type="button"
                    data-bs-dismiss="modal"
                    v-on:click="guardar"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            type="button"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
