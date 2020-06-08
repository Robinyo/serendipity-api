#!/bin/bash

# Copyright (c) 2020. TIBCO Software Inc.
# This file is subject to the license terms contained
# in the license file that is distributed with this file.

if hash yum 2>/dev/null; then
 #echo "yum found"
 PACKAGE_MGR="yum"
elif hash zypper 2>/dev/null; then
 PACKAGE_MGR="zypper"
elif hash rpm 2>/dev/null; then
 PACKAGE_MGR="rpm"
else
 #echo "other package managers not found, using apt-get"
 PACKAGE_MGR="apt_get"
fi
echo "Installing packages with $PACKAGE_MGR"

# installing JasperReports Server command line

case "$PACKAGE_MGR" in
	"yum" )
		yum -y update
		yum -y install yum-utils wget unzip curl jq
		;;
	"rpm" )
		echo "Installed nothing via rpm"
		;;
	"zypper" )
		zypper refresh && \
		zypper -n install wget unzip curl jq && \
		zypper clean -a
		;;
	"apt_get" )
		apt-get update
		apt-get install -y --no-install-recommends apt-utils unzip wget curl jq
		rm -rf /var/lib/apt/lists/*
esac
