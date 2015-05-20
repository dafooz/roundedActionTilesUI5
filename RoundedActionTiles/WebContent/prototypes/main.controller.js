jQuery.sap.require("controls.roundedActionTile.RoundedActionTile");

sap.ui.controller("prototypes.main", {
	
	tiles : [
				{
					title : "Tile 1",
					icon : "Chart-Tree-Map",
					options : [
								{
									title : "Add",
									icon : "add",
									cssClass: "exampleClass1"
								}, {
									title : "Browse",
									icon : "search"
								}
					]
				}, {
					title : "Tile 2",
					icon : "image-viewer",
					iconColor : "#54B345",
					options : [
								{
									icon : "add"
								}, {
									icon : "search"
								}
					]
				}, {
					title : "Tile 3",
					icon : "workflow-tasks",
					cssClass: "exampleClass1",
					options : [
								{
									icon : "add"
								}, {
									icon : "search"
								}, {
									icon : "delete"
								}
					]
				}, {
					title : "Tile 4",
					icon : "settings",
					options : [
								{
									icon : "employee"
								}, {
									icon : "add-photo"
								}, {
									icon : "addresses"
								}, {
									icon : "badge"
								}
					]
				}, {
					title : "Tile 5",
					icon : "duplicate",
					options : [
								{
									icon : "basket"
								}, {
									icon : "bar-code"
								}, {
									icon : "bookmark"
								}, {
									icon : "card"
								}, {
									icon : "cart"
								}
					]
				}, {
					title : "Tile 8",
					icon : "globe",
					iconColor : "#007cc0",
					cssClass : "defaultActionClass",
					options : [
								{
									icon : "search"
								}, {
									icon : "search"
								}, {
									icon : "search"
								}, {
									icon : "search"
								}, {
									icon : "search"
								}, {
									icon : "search"
								}
					]
				}, {
					title : "Tile 9",
					icon : "appointment",
					options : [
								{
									icon : "search"
								}, {
									icon : "search"
								}, {
									icon : "search"
								}, {
									icon : "search"
								}, {
									icon : "search"
								}, {
									icon : "search"
								}, {
									icon : "search"
								}
					]
				}, {
					title : "Tile 10",
					icon : "manager"
				}
	],

	onBeforeShow : function(oEvent) {

		for ( var c in this.tiles) {
			var tileItem1 = new controls.RoundedActionTile();
			tileItem1.setTitle(this.tiles[c]["title"]);
			tileItem1.setIcon("sap-icon://" + this.tiles[c]["icon"]);
			if (this.tiles[c]["cssClass"])
				tileItem1.setCssClass(this.tiles[c]["cssClass"]);
			if (this.tiles[c]["iconColor"])
				tileItem1.setIconColor(this.tiles[c]["iconColor"]);
			if (this.tiles[c]["options"]) {
				tileItem1.setTileOptions(this.tiles[c]["options"]);
			}

			this.tiles[c].object = tileItem1;

			tileItem1.attachPress({
				index : c
			}, this.showOptions, this);
			tileItem1.attachActionPress(this.handleAction, this);

			this.getView().oTilesContainer.addTile(tileItem1);
		}
	},

	showOptions : function(oEvent, oParams) {
		for ( var c in this.tiles) {
			this.tiles[c].object.showActions(false);
		}
		if(this.tiles[oParams.index]["options"])
			this.tiles[oParams.index].object.showActions(true);
		else
			this.handleAction(oEvent, oParams);
	},

	handleAction : function(oEvent, oParams) {
		debugger;
	}

});