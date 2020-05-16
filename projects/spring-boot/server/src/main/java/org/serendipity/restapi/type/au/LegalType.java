package org.serendipity.restapi.type.au;

// Australian Standard 4590.1:2017

import lombok.Getter;

@Getter
public enum LegalType {

  // Incorporated Private Sector Entities

  PROPRIETARY_COMPANY(11) {
    @Override
    public String toString() {
      return "Proprietary Company";
    }
  },
  PUBLIC_COMPANY(12) {
    @Override
    public String toString() {
      return "Public Company";
    }
  },
  OTHER_INCORPORATED_ENTITY(13) {
    @Override
    public String toString() {
      return "Other Incorporated Entity";
    }
  },

  // Unincorporated Private Sector Entities

  SOLE_TRADER(21) { // Sole Proprietorship
    @Override
    public String toString() {
      return "Sole Trader";
    }
  },
  PARTNERSHIP(23) { // Sole Proprietorship
    @Override
    public String toString() {
      return "Partnership";
    }
  },
  TRUST(25) { // Sole Proprietorship
    @Override
    public String toString() {
      return "Trust";
    }
  },
  OTHER_UNINCORPORATED_ENTITY(26) {
    @Override
    public String toString() {
      return "Other Unincorporated Entity";
    }
  },

  // Public Sector Entities

  GOVERNMENT_COMPANY(31) {
    @Override
    public String toString() {
      return "Government Company";
    }
  },
  OTHER_GOVERNMENT_ENTITY(32) {
    @Override
    public String toString() {
      return "Other Government Entity";
    }
  },
  FOREIGN_GOVERNMENT_ENTITY(33) {
    @Override
    public String toString() {
      return "Foreign Government Entity";
    }
  };

  private final Integer code;

  private LegalType(Integer code) {
    this.code = code;
  }

}

/*

Incorporated Association
Unincorporated Association
Body Corporate
Cooperative
Estate
Joint Venture
Not For Profit
Trust

*/
