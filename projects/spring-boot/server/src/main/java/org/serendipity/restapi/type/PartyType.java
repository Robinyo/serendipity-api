package org.serendipity.restapi.type;

public enum PartyType {

  INDIVIDUAL {
    @Override
    public String toString() {
      return "Individual";
      }
  },
  ORGANISATION {
    @Override
    public String toString() {
      return "Organisation";
    }
  },

  PARTY {
    @Override
    public String toString() {
      return "Party";
    }
  }

}

// https://google.github.io/styleguide/javaguide.html#s4.8.1-enum-classes
