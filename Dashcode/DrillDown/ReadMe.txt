Overview 
"DrillDown" demonstrates how to build a drill-down application using Dashcode 2.0. It contains two views. The first view displays a list of categories. Users navigate to the second view that shows a list of specific products, when they select a category. 
This sample shows how to navigate to the next view in a hierarchy of views, refresh a dynamic list, and update the content of the list controller on the fly. 
This sample contains several files. However, "index.html," "main.js," "main.css," and "DrillDown.dcproj" are the most important files. The "index.html" file builds each list; "main.js" controls navigation between these lists and updates them; "main.css" is used to style all HTML elements in the sample. "DrillDown.dcproj" is the Dashcode project, which was used to build this application.


Navigating to the Next View
Use the browser's goForward method to navigate from the current view to the next view. The code below takes users to another view whose id is productView: 
        browser.goForward(document.getElementById('productView'), category);

The "category" string indicates the userÕs selection on the current view. It becomes the header's title in the next view. 


Refreshing a Dynamic List 
Use the list's reloadData method to update the content of a dynamic edge-to-edge or rounded-rectangle list. You must refresh a list whenever its content changed. The code below refreshes the content of a list whose id is productList: 
	     document.getElementById("productList").object.reloadData(); 


Updating the Content of a List Controller
Dashcode creates the _rowData array to provide the rounded rectangle list controller with data. This sample implements a "setRowData" method, which is called whenever users selected a category on the current view. This method retrieves all products associated with the selected category and fills _rowData with these products. Step8 and Step9 respectively show how to implement and use this method.


Using the Sample
Use the Dashcode 2.0 to run "DrillDown.dcproj" (Dashcode project included in this project).
Open index.html in Safari 3 on either Mac or PC. If you have your own webserver (eg. Mac OS X Personal Web Server) and an iPhone or iPod touch or iPhone Simulator(/Developer/Platforms/AspenSimulator.platform/Developer/Applications), you can also place these files on your server and browse them using your iPhone or simulator. 
Click on any of the categories to go to its related products. 

Note: The transitions between views or screens are best viewed in the simulator or iPhone with iPhone OS 2.0.


Building the Sample

1. Create a new Project
Launch Dashcode 2.0, choose a custom web application, and name it "DrillDown."

2. Remove the content and footer objects from the canvas 

3. Create the browser
Choose Window > Show Library and click the Parts button to see all available parts. Drag the Browser part from the library to the canvas.

4. Click the disclosure triangle next to Browser to see its stack layout and header parts
The stack layout contains two views: view1 and view2. Rename them  "categoryView" and "productView," respectively.


5. Set up the transition between both views
Open the attributes selector of the stack layout. 
Select "categoryView" in the SubViews section and set it to push from right to left for 0.30 seconds in an ease-in and out manner.
Repeat the above process for "productView."


6. Implement the category view
This view contains a dynamic edge-to-edge list. Select it, drag an edge-to-edge list from the Library into it, and name the list "categoryList."
Use the Attribute inspector to set up "categoryList." Set its data type to dynamic, data source to "categoryListController," and sample rows to 4, then click the Generate button.

Dashcode automatically builds "categoryListController" for the category list in "main.js" after we clicked the Generate button. This controller contains the _rowData instance and numberOfRows and prepareRow methods. 
Both numberOfRows and prepareRow methods are required to implement this list. The prepareRow implements an onclick event handler that will be modified in Step 9. We use _rowData to update the content of the list. 
Open "main.js," navigate to "categoryListController," replace the content of _rowData with "Applications," "iPods," "Macs," and "Servers."


7. Implement the selectProducts method
This method receives the name of a selected category and returns all products associated with this category.
It returns a list made of "Xserve," "Xsan," and "Mac OS X Server" if users chose the "Server" category, for example.

8. Implement the products view
This view contains a dynamic rounded rectangle list. Select it, drag a rounded rectangle list from the Library into it, and name the list "productList." We do not need the arrow part, so remove it.
Use the Attribute inspector to set up "productList." Set its data type to dynamic, data source to "productListController", and sample rows to 4, then click the Generate button.

The generated controller also contains the numberOfRows and prepareRow methods and _rowData instance. Remove the onclick event handler from prepareRow for nothing should happen when users click on the list. The content of _rowData is function of the category selected by users. Hence, we add the "setRowData" method whose goal is to fill _rowData according to the 
chosen category. See below for its implementation:

setRowData: function(category) 
{
	    
    /* Call the selectProducts function to retrieve all products  
           associated with a received category item */
    var productDetails = selectProducts(category);
		
   if (productDetails != null)
   {
        /* Update the data source with the retrieved p*roducts */
	 this._rowData = productDetails;
			
        /* IMPORTANT: Must refresh the list once you are done appending data           
           to it. The list will be empty or outdated if you skip this step. */			                                                         
           document.getElementById("productList").object.reloadData(); 
   } 
}

The most important part about this method is the fact that it reloads "productList" after updating it. You must always refresh a list after changing its content.


9. Implement the sliding behavior 
At this point, if you run the sample and click on any of the categories, you will see an alert dialog instead of a rounded list of products. 
Let's implement an onclick handler for each row that takes users to a list of products. Navigate to "categoryListController" in "main.js" and modify the  prepareRow's onclick event handler as shown below:

prepareRow: function(rowElement, rowIndex, templateElements)
{
		
    if (templateElements.categoryLabel) 
    {
	templateElements.categoryLabel.innerText = this._rowData[rowIndex];
    }
		
    /* Assign an onclick handler that will cause the browser to go a page 
       showing all products related to this category item, when clicked */
       var self = this;
       var handler = function() 
       {
	    /* Get the category item associated with this row */
	    var category = self._rowData[rowIndex];
			
	   /* Call productListController to show all products associated with   
            "category" */
	   productListController.setRowData(category);
	   var browser = document.getElementById('browser').object;
			
	  /* The Browser's goForward method is used to make the browser push  
             down to a new level. Going back to previous levels is handled  
             automatically. */
	  browser.goForward(document.getElementById('productView'), category);
	};
        rowElement.onclick = handler;
}

The handler variable calls "setRowData" on the product list controller. This causes the list to update itself with products associated with the chosen category. handler calls the Browser's goForward method to make the browser slide to the products page. 

10. Build the sample 
Click Run in the toolbar to test the application.
Select Share icon in the navigator to share "DrillDown" and click the Save to Disk button to save files on your machine.


Feedback and Bug Reports
Please send all feedback about this sample by using the Feedback form on the bottom of the sample's webpage.
Please submit any bug reports about this sample to the Bug Reporting <http://developer.apple.com/bugreporter> page.

Copyright ©2008 Apple Inc. All rights reserved.