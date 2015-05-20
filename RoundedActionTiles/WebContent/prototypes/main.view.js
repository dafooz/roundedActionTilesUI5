sap.ui.jsview("prototypes.main", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf prototypes.main
	 */
	getControllerName : function() {
		return "prototypes.main";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf prototypes.main
	 */

	createContent : function(oController) {

		this.oTilesContainer = new sap.m.TileContainer();
		this.oTilesContainer.setHeight("100%");
		this.oTilesContainer.setVisible(true);

		return new sap.m.Page({
			title : "Rounded Actions Tiles",
			enableScrolling : false,
			content : [
				this.oTilesContainer
			]
		});
	},

	onBeforeShow : function(oEvent) {
		this.getController().onBeforeShow(oEvent);
	}

});