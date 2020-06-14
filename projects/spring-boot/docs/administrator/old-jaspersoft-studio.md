<h1 align="center">Working with Jaspersoft Studio</h1>

### Getting Started

Jaspersoft Studio is an Eclipse-based report designer for JasperReports; it's available as an Eclipse plug-in or as a 
stand-alone application.

[Download](https://community.jaspersoft.com/project/jaspersoft-studio/releases) the Community Edition of Jaspersoft 
Studio.

#### Custom Fonts

In Jaspersoft Studio select Preferences => Jaspersoft Studio => Fonts and then click the Add button:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/jaspersoft-studio-configure-custom-font.png">
</p>

#### Fonts Extention

In Jaspersoft Studio select Preferences => Jaspersoft Studio => Fonts and then click the Export button:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/fonts-extention.png">
</p>

Place a copy of the `fonts-extention.jar` in your project folder:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/project-folder.png">
</p>

Right-click on your project and select Build Path => Configure Build Path. Click the Add Jars button:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/java-build-path.png">
</p>
 
And add the `fonts-extention.jar` to the Java Build Path.

**Note:** It has been my experience that you can't use custom fonts directly but that you must create a style and then 
apply that style to an element. Also, Jaspersoft Studio doesn't like spaces in style names, for example `ColumnHeader` 
not `Column Header`.

### Resources

* Jaspersoft Community: [Documentation](https://community.jaspersoft.com/documentation?version=59011)
* Jaspersoft Community: [Forum (Answers)](https://community.jaspersoft.com/answers)
* Stack Overflow: [Questions tagged jasperserver](https://stackoverflow.com/questions/tagged/jasperserver)
* GitHub: [JasperReports](https://github.com/TIBCOSoftware/jasperreports)
