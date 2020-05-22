<template>
  <div>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2"></v-stepper-step>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 4" step="4"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 5" step="5"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 6" step="6"></v-stepper-step>
        <v-stepper-step step="7"></v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12">
            <v-row>
              <v-col>
                Tipo de documento
                <v-radio-group v-model="documentType">
                  <v-radio
                    v-for="item in documentTypes"
                    :key="item.documentType"
                    :label="item.shortName"
                    :value="item.documentType"
                  >
                  </v-radio>
                </v-radio-group>
              </v-col>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-col>
                  Nro. de Documento
                  <v-text-field label="Nro. de Documento" hide-details="auto" v-model="documentNumber"></v-text-field>
                 
              </v-col>
            </v-row>
          </v-card>
          <v-row>
            <v-col>
              <v-btn>Volver</v-btn>
            </v-col>
            <v-col>
              <v-btn text>Cancelar</v-btn>
            </v-col>
            <v-col>
              <v-btn color="primary" @click="step2">Siguente</v-btn>
            </v-col>
          </v-row>        
        </v-stepper-content>
        <!-- Step 2 Seleccionar Nombre -->
        <v-stepper-content step="2">
          Selecciona Nombre
          <v-list >
      <v-subheader>Selecciona el Nombre correcto</v-subheader>
      <v-list-item-group v-model="nameSelected" color="primary">
        <v-list-item 
          v-on:click="verifyName(item)"
          v-for="(item, i) in namesArray"
          :key="i"
        >
          <v-list-item-icon>
           <!-- <v-icon v-text="mdi-account"></v-icon> -->
          </v-list-item-icon>
          <v-list-item-content >
            <v-list-item-title  v-text="item"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
        </v-stepper-content>
        <v-stepper-content step="3">
          Selecciona Nombre
          <v-list >
      <v-subheader>Selecciona el Nombre correcto</v-subheader>
      <v-list-item-group v-if="medicalSpecialities" color="primary">
        <v-list-item 
          v-on:click="setMedicalSpeciality(item)"
          v-for="(item) in medicalSpecialities"
          :key="item.medicalspeciality"
        >
          <v-list-item-icon>
           <!-- <v-icon v-text="mdi-account"></v-icon> -->
          </v-list-item-icon>
          <v-list-item-content >
            <v-list-item-title  v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
        </v-stepper-content>
        <v-stepper-content step="4">
        </v-stepper-content>
        <v-stepper-content step="5">
        </v-stepper-content>
        <v-stepper-content step="6">
        </v-stepper-content>
        <v-stepper-content step="7">
          <v-btn  @click="step = 1" text>Cancel</v-btn>
        </v-stepper-content>

      </v-stepper-items>
    </v-stepper>
     <v-dialog
      v-model="dialog.enabled"
      max-width="290"
      persistent
    >
      <v-card>
        <p>{{dialog.title}}</p>
        <p>{{dialog.body}}</p>
      </v-card>
     </v-dialog>
  </div>
</template>

<script>
const baseUrl = "https://advenio.noip.me:10080/rest/totemappoinmentscontroller";
const faker = require('faker');
faker.locale="es_ES";

export default {
    name: "WizardAppoinment",
    data () {
      return {
        step: 1,
        dialog:{type: "info",enabled: false, title:"", body: "", timeout: 0},
        documentTypes: [],
        documentType: null,
        documentNumber: null,
        namesArray: [],
        patientData: null,
        nameSelected:"",
        scheduleSetupID: null,
        verified: false,
        appoinmentDatetime: null,
        medicalSpecialities: [],
        speciality: null,
        professional: null,
        professionals: []
      }
    },
    watch:{
      speciality: function(spec){
        console.log(spec);
        this.getProfessionals(spec);
      },
      professinoal: function(prof){
        console.log(prof);
        this.getLocations(prof);
      }
    },
    methods: {
      cancel() {
        this.step = 1;
        this.documentType=null;
        this.documentNumber=null;
        this.scheduleSetupID= null;
        this.verified= false;
        this.appoinmentDatetime= null;
        this.medicalSpecialities = [];

      },
      getLocations(prof){
        console.log("Get Locations")
      },
      getProfessionals(spec){
        console.log("Get Prof")
      },
      async loadDocumentTypes() {
        const { data } = await this.$axios.get(`/api/loadDocumentTypes`)
        this.documentTypes = data.filter(element => element.documentType <= 5);
        console.log("Load OK")
        console.log(this.documentTypes)
      },
      async step2() {
        try {
          const { data, status } = await this.$axios.get(`/api2/users/${this.documentType}/${this.documentNumber}`);
          this.namesArray = data.names.map(el => el)
          this.step++;
          //console.log(data, status);
        } catch(e) {
          if(e.response.status && e.response.status === 404) {
            this.showDialog("Atencion!","No tenemos registros con dicho numero y tipo de documento.","Info", 8)
          }
          else {
            this.showDialog("Ops!","Ocurrio un error al contactar el servidor.","Alert", 20)
          }
        }
      },
      async verifyName(name) {
        console.log("Verify")
        try {
          const { data, status } = await this.$axios.get(`/api2/users/${this.documentType}/${this.documentNumber}/verify/${name}`);
          this.getMedicalSpecialities();
          this.verified=true;
          this.step++;

          console.log(data, status);
        } catch(e) {
          if(e.response.status === 404) {
            this.showDialog("Atencion!","No tenemos registros con dicho numero y tipo de documento.","Info", 15);
            this.verified = false;
            this.step--;
          }
          else {
            this.showDialog("Ops!","Ocurrio un error al contactar el servidor.","Alert", 20)
          }
        }
      },
      setMedicalSpeciality(speciality) {
        console.log(speciality)
        this.speciality = speciality;
        this.step++;
        
      },
      async getMedicalSpecialities(){
        try {
          console.log("Get Especialidades ")
          const { data } = await this.$axios.get(`/api/getMedicalSpecialities`,{ params: {offset: 0, limit:100}})
          //console.log(data)
          this.medicalSpecialities = data;
          //this.medicalSpecialities = data.filter(element => element.documentType <= 5);
          //console.log("Load OK")
          //console.log(this.documentTypes)
        } 
        catch(e) { 
          console.log(e)

        }
      },
      showDialog(title, body , type, duration){
        console.log("Show Doalog")
        this.dialog.title = title;
        this.dialog.body = body;
        this.dialog.enabled = true;
        console.log(this.dialog)
        setTimeout(()=>{
          this.dialog.enabled = false;
          this.dialog.title = "";
          this.dialog.body = "";
        },duration*1000)
      }
    },
    mounted() {
      console.log("Mounted OK")
      this.loadDocumentTypes();
    }
  }
</script>

<style>

</style>