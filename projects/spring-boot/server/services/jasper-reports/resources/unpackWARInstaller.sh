#!/bin/bash

# The JasperReports Server CE War File Distribution
# For example: TIB_js-jrs-cp_7.5.0_bin.zip

JASPERREPORTS_SERVER_VERSION=7.5.0

unzip -o -q TIB_js-jrs-cp_${JASPERREPORTS_SERVER_VERSION}_bin.zip -d .
cd jasperreports-server-cp-${JASPERREPORTS_SERVER_VERSION}-bin || exit
unzip -o -q jasperserver.war -d jasperserver
