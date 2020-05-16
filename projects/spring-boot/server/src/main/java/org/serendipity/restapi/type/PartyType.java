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
  ORGANISATIONAL_UNIT {
    @Override
    public String toString() {
      return "Organisational Unit";
    }
  }

}

// https://google.github.io/styleguide/javaguide.html#s4.8.1-enum-classes

/*

  // EMPLOYMENT_POSITION {
  //   @Override
  //   public String toString() {
  //     return "Employment Position";
  //   }
  // },

  PARTY {
    @Override
    public String toString() {
      return "Party";
    }
  }

*/
