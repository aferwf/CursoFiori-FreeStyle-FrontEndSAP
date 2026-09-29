sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/resource/ResourceModel',
    'sap/ui/model/Filter',          
    'sap/ui/model/FilterOperator',
    'sap/ui/model/FilterType'  
  ],
 (Controller, JSONModel, ResourceModel, Filter, FilterOperator, FilterType) => {
    'use strict'

    return Controller.extend('com.fourhubx.cursofiori.controller.View1', {
      onInit() {

        var oView   = this.getView();
        var oFModel = new sap.ui.model.json.JSONModel()

         oFModel.setData({
          Cpf: "",
          ID: ""
        });

        oView.setModel(oFModel,"filter");

        
        //const oFilterModel = new JSONModel(oFilterData);
        //this.getView().setModel(oFilterModel, "filter"); 
      },

      onFilterReset: function(){
    
            },

      onFilterSearch: function () {
                var oView   = this.getView();
                var oTable  = oView.byId("table1");
                var oFModel = oView.getModel("filter");
                var oFData  = oFModel.getData();
                var oFilter = null;
                var aParams = [];
                var aFilters = [];


          if(oFData.Cpf != ''){
                    oFilter = new sap.ui.model.Filter({
                        path: 'Cpf',
                        operator: sap.ui.model.FilterOperator.EQ,
                        value1: oFData.Cpf
                    });
                    aFilters.push(oFilter);
                }
            
          if(oFData.ID != ''){
                    oFilter = new sap.ui.model.Filter({
                        path: 'ID',
                        operator: sap.ui.model.FilterOperator.EQ,
                        value1: oFData.ID
                    });
                    aFilters.push(oFilter);
                }

          oTable.bindRows({
                    path: '/ZC_TB_COMPLAINT_FF',
                    filters: aFilters
                });


              },

    //     const oFilterData = oView.getModel("filter").getData()
    //     const aFilters = [];


    //     const sCpf = oFilterData.cpf ? oFilterData.cpf.trim() : "";
    //     const sId = oFilterData.id ? oFilterData.id.trim() : "";

    //     // Filtro CPF
    // if (sCpf) {
    //     aFilters.push(
    //         new Filter("Cpf", FilterOperator.EQ, sCpf)
    //     );
    // }

    // // Filtro ID
    // if (sId) {
    //     aFilters.push(
    //         new Filter("ID", FilterOperator.EQ, sId)
    //     );
    // }

    //     const oTable = oView.byId("table1")
    //     const oBinding = oTable.getBinding("rows")
        
    //     if (oBinding) {
    //         oBinding.filter(aFilters, FilterType.Application) // Envia o filtro para o ABAP
    //     }
    //   },

    //   onFilterReset: function () {
    //     const oView = this.getView()
    //     const oFilterModel = oView.getModel("filter")

    //     oFilterModel.setData({
    //       cpf: "",
    //       id: ""
    //     })

    //     const oTable = oView.byId("table1");
    //     const oBinding = oTable.getBinding("rows");
        
    //     if (oBinding) {
    //         oBinding.filter([], FilterType.Application); 
    //     }
    //   }, 

      RouteView2: function() { 
        const oRouter = this.getOwnerComponent().getRouter()
        oRouter.navTo('RouteView2')
      }
    });
  }
);