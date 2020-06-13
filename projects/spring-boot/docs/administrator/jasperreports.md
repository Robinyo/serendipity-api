<h1 align="center">Working with JasperReports</h1>

### Getting Started

Follow the steps in the [Quick Start Guide](https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/developer/quick-start-guide.md).

### Jaspersoft Studio

Jaspersoft Studio is an Eclipse-based report designer for JasperReports; it's available as an Eclipse plug-in or as a 
stand-alone application.

[Download](https://community.jaspersoft.com/project/jaspersoft-studio/releases) the Community Edition of Jaspersoft 
Studio.

#### Custom Fonts

In Jaspersoft Studio select Preferences => Jaspersoft Studio => Fonts and then click the Add button:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/jaspersoft-studio-configure-custom-font.png">
</p>

**Note:** It has been my experience that you can't use custom fonts directly but that you must create a style and then apply that style to an element.

### JasperReports Server

Navigate to the JasperReports Community Edition welcome page: http://localhost:11001/jasperserver

You can login using the following credentials:
* JasperReports Admin User - User ID: jasperadmin and Password: jasperadmin
* Sample User - User ID: joeuser and Password: joeuser

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/jasperserver-login.png">
</p>

Reporting and Analytics:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/jasperserver-dashboard.png">
</p>

### Resources

* Jaspersoft Community: [Documentation](https://community.jaspersoft.com/documentation?version=59011)
* Jaspersoft Community: [Forum (Answers)](https://community.jaspersoft.com/answers)
* Stack Overflow: [Questions tagged jasperserver](https://stackoverflow.com/questions/tagged/jasperserver)
* GitHub: [JasperReports](https://github.com/TIBCOSoftware/jasperreports)
