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

      RouteView2: function() { 
        const oRouter = this.getOwnerComponent().getRouter()
        oRouter.navTo('RouteView2')
      }
    });
  }
);