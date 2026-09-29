sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/routing/History',
    'sap/m/MessageToast',
    'sap/m/MessageBox'
  ],
  (Controller, History, MessageToast, MessageBox) => {
    'use strict'

    return Controller.extend('com.fourhubx.cursofiori.controller.View2', {
      onInit() {

      },

      onNavBack() {
        const oHistory = History.getInstance()
        const sPreviousHash = oHistory.getPreviousHash()

        // Se houver histórico de navegação no app, volta 1 passo
        if (sPreviousHash !== undefined) {
          window.history.go(-1)
        } else {
          // Se o usuário entrou direto pelo link da página 2, força a navegação para a View1
          const oRouter = this.getOwnerComponent().getRouter()
          oRouter.navTo('RouteView1', {}, true) 
        }
      },

      onValidaCPF: function (oEvent) {
        const oInput = oEvent.getSource()
        let sCpf = oInput.getValue()

        sCpf = sCpf.replace(/\D/g, '')
        oInput.setValue(sCpf)

        const bValido = /^\d{11}$/.test(sCpf)

        if (!bValido) {
          oInput.setValueState("Error")
          oInput.setValueStateText('CPF inválido. Digite 11 números.')
        } else {
          oInput.setValueState("None")
          oInput.setValueStateText('')
        }
      },

      onSave: function () {
        const oView = this.getView()

        const oCpfInput = oView.byId('inputCpf')
        if (
          oCpfInput.getValueState() === "Error" ||
          !oCpfInput.getValue()
        ) {
          MessageBox.error('Verifique o CPF antes de salvar. Ele deve conter 11 números.')
          return
        }

        const oModel = oView.getModel()

        // 1. Coleta os valores da View
        const sCpf = oView.byId('inputCpf').getValue()
        const sTipo = oView.byId('selectTipo').getSelectedKey()
        const sMarca = oView.byId('inputMarca').getValue()
        const sStatus = oView.byId('selectStatus').getSelectedKey()
        const sMensagem = oView.byId('textMensagem').getValue()

        // 2. Monta o payload

        const oPayload = {
          Cpf: sCpf,
          // ID: '',
          // Sequencia: '',
          Tipo: sTipo,
          Marca: sMarca,
          Status: sStatus,
          Mensagem: sMensagem,
        }

        // 3. Cria o binding da lista apontando para a Entity
        const oListBinding = oModel.bindList('/ZC_TB_COMPLAINT_FF')

        // 4. Inicia a criação do registro (POST)
        const oContext = oListBinding.create(oPayload)

        // 5. Trata o sucesso e o erro usando a Promise nativa do V4
        oContext
          .created()
          .then(function () {
            sap.m.MessageToast.show('Reclamação salva com sucesso!')

            oView.byId('inputCpf').setValue('')
            oView.byId('textMensagem').setValue('')
          })
          .catch(function (oError) {
            sap.m.MessageBox.error('Erro ao tentar salvar no banco de dados.')
            console.error('Detalhes do Erro OData:', oError)
          })
      },
    })
  },
)
