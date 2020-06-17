<h1 align="center">Working with JasperReports Server</h1>

### Getting Started

Follow the steps in the [Quick Start Guide](https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/developer/quick-start-guide.md).

### JasperReports Server

Navigate to the JasperReports Server Community Edition welcome page: http://localhost:11001/jasperserver

You can login using the following credentials:
* JasperReports Admin User - User ID: jasperadmin and Password: jasperadmin
* Sample User - User ID: joeuser and Password: joeuser

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/jasperserver-login.png">
</p>

JasperReports Server Community Edition landing page:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/jasperserver-landing-page.png">
</p>

With samples (JRS_LOAD_SAMPLES=true):

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/jasperserver-landing-page-load-samples.png">
</p>

#### Data Sources

In JasperReports Server right-click on Data Sources and select Add Resource => Data Source:

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/jasperserver-add-resource-data-source.png">
</p>

JDBC Driver: org.postgresql.Driver  
Host: postgres  
Port: 5432  
Database: serendipity  
Username: POSTGRES_USER (admin)  
Password: POSTGRES_PASSWORD (secret) 

Click Save and then enter a Data Source Name: 

<p align="center">
  <img src="https://github.com/Robinyo/serendipity-api/blob/master/projects/spring-boot/docs/screen-shots/jasperserver-data-source-name.png">
</p>

### Resources

* Jaspersoft Community: [Documentation](https://community.jaspersoft.com/documentation?version=59011)
* Jaspersoft Community: [Forum (Answers)](https://community.jaspersoft.com/answers)
* Stack Overflow: [Questions tagged jasperserver](https://stackoverflow.com/questions/tagged/jasperserver)
* GitHub: [JasperReports](https://github.com/TIBCOSoftware/jasperreports)
