/**
 * @author Jon Jouret
 */

jQuery.sap.declare("controls.roundedActionTile");
jQuery.sap.includeStyleSheet("controls/roundedActionTile/roundedActionTile.css");
jQuery.sap.require("sap.m.StandardTile");
jQuery.sap.require("sap.ui.core.IconPool");

sap.m.StandardTile.extend("controls.RoundedActionTile", {
	metadata : {
		properties : {
			// Icon color property with default value to standard UI5 blue
			iconColor : {
				type : "string",
				defaultValue : "#007cc0"
			},
			cssClass:{
				type : "string",
				defaultValue: "defaultActionClass"
			}
		},
		events:{
			actionPress : {}
		}
	},
	
	aTileOptions: null,
	
	setTileOptions:function(aOptions){
		this.aTileOptions = aOptions;
	},
	
	showActions:function(bVisible){
		for(var i in this.aTileOptions){
			var elem = this.$().find("#"+this.aTileOptions[i].sId);// lookup the element by id saved during the rendering
			if(elem){
				bVisible?elem.removeClass("actionHidden"):elem.addClass("actionHidden");// hide or show the DOM element
			}
		}
	},
	
	onAfterRendering:function(){
		// Call the parent method as it's the one placing the tiles in the container
		sap.m.Tile.prototype.onAfterRendering.call(this);
		
		for(var i in this.aTileOptions){
			// lookup the elements in order to add the listener on the click
			var elem = this.$().find("#"+this.aTileOptions[i].sId);
			if(elem){
				elem.click(function(oEvent){
					this.actionClicked({tile: this, actionId:oEvent.currentTarget.id});
				}.bind(this));
				
			}
		}
		// attach the blur event on the tile to hide the actions when it looses the focus
		this.$().blur(function(){
			for(var i in this.aTileOptions){
				var elem = this.$().find("#"+this.aTileOptions[i].sId);
				if(elem){
					elem.addClass("actionHidden");
				}
			}
		}.bind(this));
	},
	
	getActionImage:function(icon){
			
			var sImgId = this.getId() + "-action-img";
			var sSize = "1.3rem";
			
			var mProperties = {
				src : sap.ui.core.IconPool.getIconURI(icon),
				height :  "2rem",
				width :  "2rem",
				size: sSize,
				densityAware : this.getIconDensityAware()
			};
			
			this._oActionImageControl = sap.m.ImageHelper.getImageControl(sImgId, this._oActionImageControl, this, mProperties);
			
			return this._oActionImageControl;
	},

	renderer : function(rm, oControl) {
		rm.write("<div tabindex=\"0\"");
		rm.writeControlData(oControl);
		rm.addClass("roundedActionTile");
		rm.addClass("sapMPointer");
		rm.addClass(oControl.getCssClass());
		rm.writeClasses();
		if (oControl._invisible) {
			rm.addStyle("visibility", "hidden");
			rm.writeStyles();
		}
		var sTooltip = oControl.getTooltip_AsString();
		if (sTooltip) {
			rm.writeAttributeEscaped("title", sTooltip);
		}
		rm.write(">");
		if (oControl.getRemovable()) {
			rm.write("<div id=\"" + oControl.getId() + "-remove\" class=\"sapMTCRemove\"></div>");
		} else {
			rm.write("<div id=\"" + oControl.getId() + "-remove\" class=\"sapMTCNoRemove\"></div>");
		}
		rm.write("<div class=\"roundedTileContent\">");
// render the content		
		rm.write("<div"); // Start top row
		rm.addClass("roundedActionTileTopRow");
		rm.writeClasses();
		rm.write(">");
		if (oControl.getIcon()) {
			rm.write("<div");
			rm.addClass("sapMStdTileIconDiv");
			rm.write(" style=\"color:" + oControl.getIconColor() + ";\"");

			switch (oControl.getType()) {
			case sap.m.StandardTileType.Monitor:
				rm.addClass("sapMStdIconMonitor");
				break;
			case sap.m.StandardTileType.Create:
				rm.addClass("sapMStdIconCreate");
				break;
			}
			rm.writeClasses();
			rm.write(">");

			var icon = oControl._getImage();
			icon.addStyleClass('roundedActionTileIcon');

			rm.renderControl(icon);
			rm.write("</div>");
		}

		rm.write("</div>"); // End top row div

		rm.write("<div"); // Start monitoring tile styling
		rm.addClass("roundedActionTileBottomRow");
		if (oControl.getType() === sap.m.StandardTileType.Monitor) {
			rm.addClass("sapMStdTileMonitorType");
		}
		rm.writeClasses();
		rm.write(">");

		rm.write("<div"); // Start title div
		rm.writeAttribute("id", oControl.getId() + "-title");
		rm.addClass("roundedActionTileTitle");
		rm.writeClasses();
		rm.write(" style=\"color:" + oControl.getIconColor() + ";\"");
		rm.write(">");
		if (oControl.getTitle()) {
			rm.writeEscaped(oControl.getTitle());
		}
		rm.write("</div>"); // End title div

		if (oControl.getInfo()) {
			rm.write("<div"); // Start info
			rm.writeAttribute("id", oControl.getId() + "-info");
			rm.addClass("sapMStdTileInfo");
			rm.addClass("sapMStdTileInfo" + oControl.getInfoState());
			rm.writeClasses();
			rm.write(">");
			if (oControl.getInfo()) {
				rm.writeEscaped(oControl.getInfo());
			}
			rm.write("</div>"); // End info
		}
		rm.write("</div>"); // End bottom row type tile styling
		
		if(oControl.aTileOptions){// Start actions management
			var startPoint, nbrLeft, firstPosition = 0; // initialize the variable 
			var rotationFactor = 51; // Fixed rotation factor (based on the action div size)
			startPoint = -135; // Starting point of the rotations
			if(oControl.aTileOptions.length%2 == 1){ // compute the number of elements to be placed on the left
				nbrLeft = (parseInt(oControl.aTileOptions.length/2));
			}else{
				nbrLeft = (parseInt(oControl.aTileOptions.length/2) - 0.5);
			}
			// Compute the first position to be taken by the created action div.
			firstPosition = startPoint - (nbrLeft*rotationFactor); 
			
			for(var i in oControl.aTileOptions){
				var rotation = firstPosition + (rotationFactor*i); // Compute the rotation needed for the current action
				var invertedRotation = rotation>0?-rotation:Math.abs(rotation); // compute the inverse rotation (used for the content)
				rm.write("<div");// Start action container
				rm.writeAttribute("id", oControl.getId() + "-action_"+i);
				rm.writeAttribute("style", "transform: rotate("+ rotation +"deg) translate(80px,80px);"); // apply transformation
				rm.addClass("actionItem");
				rm.addClass("actionHidden");
				if(oControl.aTileOptions[i].cssClass) // apply the custom or standard CSS class
					rm.addClass(oControl.aTileOptions[i].cssClass);
				else
					rm.addClass("defaultActionClass");
				rm.writeClasses();
				
				if (oControl.aTileOptions[i].title) { // Write the action title as tooltip
					rm.write(" title=\"");
					rm.writeEscaped(oControl.aTileOptions[i].title);
					rm.write("\"");
				}
				
				rm.write(">");
				// Start Icon
				rm.write("<div");
				rm.addClass("innerActionItem"); // create the content of the action
				rm.write(" style=\"color:" + oControl.aTileOptions[i].iconColor + "; transform: rotate("+ invertedRotation +"deg);\""); // apply the inverted rotation to the content of the action div
				rm.writeClasses();
				rm.write(">");
				var action_icon = oControl.getActionImage(oControl.aTileOptions[i].icon);// get the icon
				action_icon.addStyleClass('roundedActionTileActionIcon');
				rm.renderControl(action_icon);
				rm.write("</div>");

				// End Icon
				rm.write("</div>");// End action container
				oControl.aTileOptions[i].sId = oControl.getId() + "-action_"+i;// add the id of the created div in the aTileOption attribute for future reference
			}
		}// End actions management
// End of content
		rm.write("</div></div>");
	},
	
	actionClicked:function(oParams){
		for(var i in oParams.tile.aTileOptions){
			if(oParams.tile.aTileOptions[i].sId === oParams.actionId){
				oParams.action = { actionTag : oParams.tile.aTileOptions[i].actionTag};
				break;
			}
		}
		this.fireActionPress(oParams);
	}
});
