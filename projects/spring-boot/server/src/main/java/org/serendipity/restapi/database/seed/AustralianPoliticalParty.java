package org.serendipity.restapi.database.seed;

public enum AustralianPoliticalParty {

  AUSTRALIAN_GREENS("AG") {
    @Override
    public String toString() {
      return "Australian Greens";
    }
  },
  AUSTRALIAN_LABOR_PARTY("ALP") {
    @Override
  public String toString() {
    return "Australian Labor Party";
  }
  },
  CENTRE_ALLIANCE("CA") {
    @Override
    public String toString() {
      return "Centre Alliance";
    }
  },
  JACQUI_LAMBIE_NETWORK("JLN") {
    @Override
    public String toString() {
      return "Jacqui Lambie Network";
    }
  },
  LIBERAL_PARTY_OF_AUSTRALIA("LP") {
    @Override
    public String toString() {
      return "Liberal Party of Australia";
    }
  },
  NATIONAL_PARTY_OF_AUSTRALIA("NATS") {
    @Override
    public String toString() {
      return "National Party of Australia";
    }
  },
  PAULINE_HANSONS_ONE_NATION("PHON") {
    @Override
    public String toString() {
      return "Pauline Hanson's One Nation";
    }
  },
  INDEPENDENT("IND") {
    @Override
    public String toString() {
      return "Independent";
    }
  };

  private final String abbreviation;

  private AustralianPoliticalParty(String abbreviation) {
    this.abbreviation = abbreviation;
  }

  public static AustralianPoliticalParty valueOfAbbreviation(String abbreviation) {

    for (AustralianPoliticalParty e : values()) {
      if (e.abbreviation.equals(abbreviation)) {
        return e;
      }
    }

    return AustralianPoliticalParty.INDEPENDENT;

  }

}
