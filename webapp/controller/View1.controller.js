sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/resource/ResourceModel',
  ],
  (Controller, JSONModel, ResourceModel) => {
    'use strict'

    return Controller.extend('com.fourhubx.cursofiori.controller.View1', {
      onInit() {
        // Carrega o arquivo i18n de acordo com o idioma
        // const oI18nModel = new ResourceModel({
        //   bundleName: 'cursofiori.i18n.i18n',
        // })

        // this.getView().setModel(oI18nModel, 'i18n')

        // // Acessa os textos traduzidos
        // const oBundle = oI18nModel.getResourceBundle()

        const oDados = {}

        const oModel = new JSONModel(oDados)
        this.getView().setModel(oModel)
      },

      RouteView2() {
        const oRouter = this.getOwnerComponent().getRouter()
        oRouter.navTo('RouteView2')
      },
    })
  },
)
