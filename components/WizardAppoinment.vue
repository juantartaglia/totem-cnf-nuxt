<template>
  <div>
     
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 4" step="4"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 5" step="5"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 6" step="6"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="7"></v-stepper-step>
      <v-progress-linear
        v-if="loading"
        indeterminate
        bottom
        color="deep-purple accent-4"
      ></v-progress-linear>
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
            </v-col>
            <v-col>
            </v-col>
            <v-col>
              <v-btn color="primary" @click="step2()">Siguente</v-btn>
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
           <v-row>
            <v-col>
              <v-btn @click="back()">Volver</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="cancel()" text>Cancelar</v-btn>
            </v-col>
            <v-col>
            </v-col>
          </v-row>        
        </v-stepper-content>
        <!-- Step 3 Seleccionar Especialidad -->
        <v-stepper-content step="3">
          Selecciona especialidad
          <v-list >
            <v-subheader>Selecciona especialidad</v-subheader>
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
          <v-btn  @click="cancel()" text>Cancelar</v-btn>
        </v-stepper-content>
        
        <!-- step 4 profesionales -->
        
        <v-stepper-content step="4">
          <v-list >
            <v-subheader>Selecciona Profesional</v-subheader>
            <v-list-item-group v-if="professionals" color="primary">
              <v-list-item 
                v-on:click="setProfessional(item)"
                v-for="(item) in professionals"
                :key="item.professional"
              >
                  <v-list-item-icon>
                    <!-- <v-icon v-text="mdi-account"></v-icon> -->
                  </v-list-item-icon>
                  <v-list-item-content >
                  <v-list-item-title>{{item.prefix}} {{item.firstname}} {{item.lastname}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>   
           <v-row>
            <v-col>
              <v-btn @click="back()">Volver</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="cancel()" text>Cancelar</v-btn>
            </v-col>
            <v-col>
            </v-col>
          </v-row>
        </v-stepper-content>
        <v-stepper-content step="5">
          <v-list >
            <v-subheader>Selecciona Locacion</v-subheader>
            <v-list-item-group v-if="buildings" color="primary">
              <v-list-item 
                v-on:click="setLocation(item)"
                v-for="(item,i) in buildings"
                :key="i"
              >
                  <v-list-item-icon>
                    <!-- <v-icon v-text="mdi-account"></v-icon> -->
                  </v-list-item-icon>
                  <v-list-item-content >
                  <v-list-item-title>{{item.buildingname}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>   
           <v-row>
            <v-col>
              <v-btn @click="back()">Volver</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="cancel()" text>Cancelar</v-btn>
            </v-col>
            <v-col>
            </v-col>
          </v-row>
        </v-stepper-content>
        <v-stepper-content step="6">
            <v-row>
              <v-col  v-on:click="setAppointment(item)"
                v-for="(item) in appointments"
                :key="item.appointmentdatetime">
                <v-sheet
            class="d-flex mt-auto"
            color="purple lighten-3"
          >
            {{item.dayname}} <br>
             {{item.initialhour}}
          </v-sheet>


              </v-col>
            </v-row>

           
            <v-row>
            <v-col>
              <v-btn @click="back()">Volver</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="cancel()" text>Cancelar</v-btn>
            </v-col>
            <v-col>
            </v-col>
          </v-row>
        </v-stepper-content>
        <v-stepper-content step="7">
           <v-row>
            <v-col>
              <v-btn @click="back()">Volver</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="cancel()" text>Cancelar</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="send()" text>Finalizar</v-btn>
            </v-col>
          </v-row>
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




//DONE: dentro del gettter si es exitoso hacer step++, no antes.
//Ademas de prueba multilinea

//DONE: Tarea realizada




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
        professionals: [],
        loading: false,
        buildings: [],
        location: null,
        appointments: [],
        appoinment: { scheduleSetupID: null, documentType: null, appoinmentDatetime: null, videocall: false}
      }
    },
    watch:{
      speciality: function(spec){
        //DONE: watcher para que cuando cambie de especialidad, levante profesionales
        console.log("Watch speciality ",spec);
        this.getProfessionals(spec);
      },
      professional: function(prof){
        //DONE: WATCHER cuando cambie profesional, levante locaciones.
        console.log("Watch professional ",prof);
        this.getLocations(prof);
      },
      location: function(loc){
        console.log(loc);
        //DONE: Call get appointments
        this.getAppoinments();
      }
    },
    methods: {
      registerSuccess(){
        //TODO: Registracion de turno correcta.
      },
      confirmAppointment(appointment){
        //TODO: Set Appointment with post data to endponint. Wait until response and then display message result
      },
      async setAppointment(appoinment){
        //TODO: Set Appointment open dialog de confirmacion, si confirma, registrar turno y avanzar a exitoso
        //TODO: Paginacion con botones flotantes solo visibles si se dan las condiciones de visualizacion, por ejemplo pagina = 0 boton de retroceder no visible.
        //TODO: Open Dialog ConfirmAppoinment
        console.log(appoinment);
         this.loading = true;
        try {
        let scheduleSetupId = appoinment.medicalschedulesetup;
        let documenttype = this.documentType;
        let documentNumber = this.documentNumber;
        let aoopintmentDatetime = appoinment.appoinmentDatetime;
        let videocall = false;
        const { data } = await this.$axios.post(`/api/bookAppointment`,{scheduleSetupID, documenttype, documentNumber, appoinmentDatetime, videocall})
        
        console.log(data)
        
        }
        catch(e) { console.log(e)} finally { this.loading = false;}

      },
      async getAppoinments(){
        this.loading = true;
        try {
          console.log("Get Appointments");
          const { data } = await this.$axios.get(`/api/getAppointments`,{ params: {building: this.location,offset: 0, limit: 30,videocall : false,professional: this.professional, speciality: this.speciality}})
          console.log(data)
          this.appointments = data;
        }
        catch(e) { console.log(e)} finally {
          this.loading = false;
        }  
      },
      send(){
        console.log("Send")
      },
      back(){
        this.step--;
      },
      cancel() {
        this.step = 1;
        this.documentType=null;
        this.documentNumber=null;
        this.scheduleSetupID= null;
        this.verified= false;
        this.appoinmentDatetime= null;
        this.medicalSpecialities = [];

      },
      setLocation(item){
        console.log("Set Location");
        console.log(item);
        this.location = item.buildingid;
        this.step++;
      },
      setProfessional(prof){
        console.log("Set profesional")
        console.log(prof);
        this.professional = prof.professional;
        this.speciality = prof.specialities;
        this.step++;
        //this.getLocations()
      },
      async getLocations(){
        this.loading = true;
        try {
          console.log("Get Locations");
          const { data } = await this.$axios.get(`/api/getProfessionalBuildings`,{ params: {professionalId: this.professional, medicalSpecialityId: this.speciality}})
          console.log(data)
          this.buildings = data;
        }
        catch(e) { console.log(e)} finally {
          this.loading = false;
        }
      },
      async getProfessionals(spec){
        this.loading = true;
        try {
          console.log("Get Prof");
        console.log(spec)
        const { data } = await this.$axios.get(`/api/getProfessionals`,{ params: {filter: '',offset: 0, limit:100, medicalspeciality: spec.medicalspeciality}})
        //console.log(data)
        this.professionals = data;
        }
        catch(e) { console.log(e)} finally { this.loading = false;}
      },
      async loadDocumentTypes() {
        const { data } = await this.$axios.get(`/api/loadDocumentTypes`)
        this.documentTypes = data.filter(element => element.documentType <= 5);
        console.log("Load OK")
        console.log(this.documentTypes)
      },
      async step2() {
        this.loading = true;
        try {
          const { data, status } = await this.$axios.get(`/api2/users/${this.documentType}/${this.documentNumber}`);
          this.namesArray = data.names.map(el => el)
          this.step++;
        } catch(e) {
          if(e.response.status && e.response.status === 404) {
            this.showDialog("Atencion!","No tenemos registros con dicho numero y tipo de documento.","Info", 8)
          }
          else {
            this.showDialog("Ops!","Ocurrio un error al contactar el servidor.","Alert", 20)
          }
        }
        finally {
          this.loading = false;
        }
      },
      async verifyName(name) {
        console.log("Verify")
        try {
          const { data, status } = await this.$axios.get(`/api2/users/${this.documentType}/${this.documentNumber}/verify/${name}`);
          this.getMedicalSpecialities();
          this.verified=true;
          this.step++;
        } catch(e) {
          if(e.response.status === 404) {
            this.showDialog("Atencion!","No tenemos registros con dicho numero y tipo de documento.","Info", 8);
            this.verified = false;
            this.step--;
          }
          else {
            this.showDialog("Ops!","Ocurrio un error al contactar el servidor.","Alert", 5)
          }
        }
      },
      setMedicalSpeciality(speciality) {
        this.speciality = speciality;
        this.step++;
      },
      async getMedicalSpecialities(){
        this.loading = true;
        try {
          const { data } = await this.$axios.get(`/api/getMedicalSpecialities`,{ params: {offset: 0, limit:100}})
          this.medicalSpecialities = data;
        } 
        catch(e) { 
          console.log(e)
        }
        finally {
          this.loading= false;
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
      this.loadDocumentTypes();
    }
  }
</script>

<style>

</style>