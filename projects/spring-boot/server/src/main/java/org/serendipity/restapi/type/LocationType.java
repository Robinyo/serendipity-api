package org.serendipity.restapi.type;

public enum LocationType {

  ADDRESS {
    @Override
    public String toString() {
      return "Address";
    }
  },
  ELECTRONIC_ADDRESS {
    @Override
    public String toString() {
      return "Electronic Address";
    }
  },

  LOCATION {
    @Override
    public String toString() {
      return "Location";
    }
  }

}

// type = "Address" | "Natural Area" | "Management Zone"
