import axios from "axios";
import * as M from "materialize-css";
import Vue from "vue";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

// Links to GraphQL API at /graphql
const client = new ApolloClient();

// tslint:disable-next-line no-unused-expression
new Vue( {
    computed: {
        hazGuitars(): boolean {
            return this.isLoading === false && this.guitars.length > 0;
        },
        noGuitars(): boolean {
            return this.isLoading === false && this.guitars.length === 0;
        }
    },
    data() {
        return {
            brand: "",
            color: "",
            guitars: [],
            isLoading: true,
            model: "",
            selectedGuitar: "",
            selectedGuitarId: 0,
            year: ""
        };
    },
    el: "#app",
    methods: {
        addGuitar() {
            const guitar = {
                brand: this.brand,
                color: this.color,
                model: this.model,
                year: this.year
            };
            // axios
            //     .post( "/api/guitars/add", guitar )
            //     .then( () => {
            //         this.$refs.year.focus();
            //         this.brand = "";
            //         this.color = "";
            //         this.model = "";
            //         this.year = "";
            //         this.loadGuitars();
            //     } )
            //     .catch( ( err: any ) => {
            //         // tslint:disable-next-line:no-console
            //         console.log( err );
            //     } );
            
            axios({
                url: `http://localhost:8080/graphql`,
                method: 'post',
                data: {
                    query: `
                        mutation{
                            createGuitar(
                              userId: "1"
                              brand: "${ guitar.brand }"
                              model: "${ guitar.model }"
                              year: ${ guitar.year }
                              color: "${ guitar.color }"
                            ){
                              id
                              userId
                              brand
                              model
                              year
                              color
                            }
                          }
                    `
                }
            }).then((result) => {
                this.$refs.year.focus();
                this.brand = "";
                this.color = "";
                this.model = "";
                this.year = "";
                this.loadGuitars();
            })
            .catch( ( err: any ) => {
                // tslint:disable-next-line:no-console
                console.log( err );
            });
        },
        confirmDeleteGuitar( id: string ) {
            const guitar = this.guitars.find( ( g ) => g.id === id );
            this.selectedGuitar = `${ guitar.year } ${ guitar.brand } ${ guitar.model }`;
            this.selectedGuitarId = guitar.id;
            const dc = this.$refs.deleteConfirm;
            const modal = M.Modal.init( dc );
            modal.open();
        },
        deleteGuitar( id: string ) {
            // axios
            //     .delete( `/api/guitars/remove/${ id }` )
            //     .then( this.loadGuitars )
            //     .catch( ( err: any ) => {
            //         // tslint:disable-next-line:no-console
            //         console.log( err );
            //     } );
            axios({
                url: `http://localhost:8080/graphql`,
                method: 'post',
                data: {
                    query: `
                        mutation {
                            deleteGuitar(id: ${ id })
                        }
                    `
                }
            }).then((result) => {
                this.loadGuitars();
                console.log(result.data);
            });

            // client.query({
            //     query: gql`
            //         mutation {
            //             deleteGuitar(id: ${ id })
            //         }
            //     `,
            // }).then((result) => {
            //     this.loadGuitars();
            //     console.log(result.data);
            // }).catch(error => console.error(error));
        },
        loadGuitars() {
            // axios
            //     .get( "/api/guitars/all" )
            //     .then( ( res: any ) => {
            //         this.isLoading = false;
            //         this.guitars = res.data;
            //         console.log(JSON.stringify(res.data));
            //     } )
            //     .catch( ( err: any ) => {
            //         // tslint:disable-next-line:no-console
            //         console.log( err );
            //     } );

            axios({
                url: `http://localhost:8080/graphql`,
                method: 'post',
                data: {
                    query: `
                        query {
                            guitars{
                                id
                                userId
                                year
                                brand
                                model
                                color
                            }
                        }
                    `
                }
            })
            .then((result) => {
                this.isLoading = false;
                this.guitars = result.data.data.guitars;
                console.log("Graphql guitars query results:" + JSON.stringify(result.data.data.guitars));
            })
            .catch( (err) => {
                console.log(err);
            } );
        }
    },
    mounted() {
        return this.loadGuitars();
    }
} );