package org.serendipity.restapi.type.au;

import lombok.Getter;

@Getter
public enum IdentifierType {

  ABN("ABN", "Australian Business Register") {
    @Override
    public String toString() {
      return "Australian Business Number";
    }
  },
  ACN("ACN", "Australian Securities and Investments Commission") {
    @Override
    public String toString() {
      return "Australian Company Number";
    }
  },
  CRN("CRN", "Services Australia") {
    @Override
    public String toString() {
      return "Customer Reference Number";
    }
  };

  private final String code;
  private final String register;

  private IdentifierType(String code, String register) {
    this.code = code;
    this.register = register;
  }

}
