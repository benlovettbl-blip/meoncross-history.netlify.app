
window.startMePath = startMePath;
window.returnToDashboard = returnToDashboard;
window.initMeSimGame = initMeSimGame;

// =============================================================
// CHRONOLOGY PARSER RETRO TEXT ADVENTURE GAME ENGINE
// =============================================================

const meEpicEngine = {
  state: {
    chapter: 1,
    room: "HOUSE",
    inventory: [],
    ch1_deedsSecured: false,
    ch2_rationsSecured: false,
    ch3_awaitingChokepoint: false,
    ch3_victory: false
  },

  chapters: {
    1: "1: CIVIL WAR (1947-48)",
    2: "2: THE WAR & EXODUS (1948)",
    3: "3: REFUGEE CAMPS (1949-53)"
  },

  rooms: {
    HOUSE: {
      chap: 1, name: "FAMILY HOUSE", mapLabel: "JAFFA URBAN GRID", mapCoords: [32.052, 34.753], mapZoom: 13,
      description: "You are inside your family home in Jaffa (April 1948). The UN Partition plan has triggered a brutal, localized civil war. Outside, shortwave radio broadcasts are reporting the tragic massacre of Palestinian villagers at DEIR YASSIN by extremist Irgun and Lehi militias. The terrifying news spreads absolute panic through the streets as families pack what they can carry.\nAn old wooden DESK sits in the corner. To the West, the street leads out toward the crowded JAFFA HARBOR.",
      exits: { west: "HARBOR" }
    },
    HARBOR: {
// Missing line 1663
// Missing line 1664
// Missing line 1665
// Missing line 1666
// Missing line 1667
// Missing line 1668
// Missing line 1669
// Missing line 1670
// Missing line 1671
// Missing line 1672
// Missing line 1673
// Missing line 1674
      exits: { north: "ROAD" }
    }
  },

  insights: {
    ch1_deeds: "🍊 GCSE Fact Check (KT1.2): The civil war phase (Nov 1947–May 1948) saw intense psychological warfare. The April 1948 attack on the village of Deir Yassin by Jewish paramilitary groups resulted in the deaths of over 100 civilians. Reports of the tragedy caused widespread terror, triggering the mass flight of Palestinians from urban centers like Jaffa and Haifa before Arab armies even entered the conflict.",
    ch2_nakba: "⛺ GCSE Fact Check (KT1.2): On May 15, 1948, the conflict escalated into an international war as Egypt, Jordan, Syria, and Iraq invaded. Despite initial Arab advances, unified Israeli forces secured key territories. The 1949 Armistice Lines left the Gaza Strip under Egyptian administration and the West Bank under Jordanian control, solidifying the displacement of 700,000 refugees.",
  }
};

let meParserFormBound = false;
let meGameMap = null;
// Missing line 1687
// Missing line 1688
// Missing line 1689
// Missing line 1690
// Missing line 1691
// Missing line 1692
// Missing line 1693
// Missing line 1694
// Missing line 1695
// Missing line 1696
// Missing line 1697
// Missing line 1698
// Missing line 1699
// Missing line 1700
// Missing line 1701
// Missing line 1702
// Missing line 1703
// Missing line 1704
// Missing line 1705
// Missing line 1706
// Missing line 1707
// Missing line 1708
// Missing line 1709
// Missing line 1710
// Missing line 1711
// Missing line 1712
// Missing line 1713
// Missing line 1714
// Missing line 1715
// Missing line 1716
// Missing line 1717
// Missing line 1718
// Missing line 1719
// Missing line 1720
// Missing line 1721
// Missing line 1722
// Missing line 1723
// Missing line 1724
// Missing line 1725
// Missing line 1726
// Missing line 1727
// Missing line 1728
// Missing line 1729
// Missing line 1730
// Missing line 1731
// Missing line 1732
// Missing line 1733
// Missing line 1734
// Missing line 1735
// Missing line 1736
// Missing line 1737
// Missing line 1738
// Missing line 1739
// Missing line 1740
// Missing line 1741
// Missing line 1742
// Missing line 1743
// Missing line 1744
// Missing line 1745
// Missing line 1746
// Missing line 1747
// Missing line 1748
// Missing line 1749
// Missing line 1750
// Missing line 1751
// Missing line 1752
// Missing line 1753
// Missing line 1754
// Missing line 1755
// Missing line 1756
// Missing line 1757
// Missing line 1758
// Missing line 1759
// Missing line 1760
// Missing line 1761
// Missing line 1762
// Missing line 1763
// Missing line 1764
// Missing line 1765
// Missing line 1766
// Missing line 1767
// Missing line 1768
// Missing line 1769
// Missing line 1770
// Missing line 1771
// Missing line 1772
// Missing line 1773
// Missing line 1774
// Missing line 1775
// Missing line 1776
// Missing line 1777
// Missing line 1778
// Missing line 1779
// Missing line 1780
// Missing line 1781
// Missing line 1782
// Missing line 1783
// Missing line 1784
// Missing line 1785
// Missing line 1786
// Missing line 1787
// Missing line 1788
// Missing line 1789
// Missing line 1790
// Missing line 1791
// Missing line 1792
// Missing line 1793
// Missing line 1794
// Missing line 1795
// Missing line 1796
// Missing line 1797
// Missing line 1798
// Missing line 1799
// Missing line 1800
// Missing line 1801
// Missing line 1802
// Missing line 1803
// Missing line 1804
// Missing line 1805
// Missing line 1806
// Missing line 1807
// Missing line 1808
// Missing line 1809
// Missing line 1810
// Missing line 1811
// Missing line 1812
// Missing line 1813
// Missing line 1814
// Missing line 1815
// Missing line 1816
// Missing line 1817
// Missing line 1818
// Missing line 1819
// Missing line 1820
// Missing line 1821
// Missing line 1822
// Missing line 1823
// Missing line 1824
// Missing line 1825
// Missing line 1826
// Missing line 1827
// Missing line 1828
// Missing line 1829
// Missing line 1830
// Missing line 1831
// Missing line 1832
// Missing line 1833
// Missing line 1834
// Missing line 1835
// Missing line 1836
// Missing line 1837
// Missing line 1838
// Missing line 1839
// Missing line 1840
// Missing line 1841
// Missing line 1842
// Missing line 1843
// Missing line 1844
// Missing line 1845
// Missing line 1846
// Missing line 1847
// Missing line 1848
// Missing line 1849
// Missing line 1850
// Missing line 1851
// Missing line 1852
// Missing line 1853
// Missing line 1854
// Missing line 1855
// Missing line 1856
// Missing line 1857
// Missing line 1858
// Missing line 1859
// Missing line 1860
// Missing line 1861
// Missing line 1862
// Missing line 1863
// Missing line 1864
// Missing line 1865
// Missing line 1866
// Missing line 1867
// Missing line 1868
    talk:    ["talk", "speak", "ask", "chat", "inform", "tell"],
    help:    ["help", "commands", "vocab", "hint"],
    inv:     ["inv", "inventory", "bag", "items", "pocket"]
  },
  nouns: {
    crate:       ["crate", "box", "chest", "cargo", "blankets", "wood"],
    certificate: ["certificate", "papers", "paper", "visa", "document", "documents", "pass"],
    officer:     ["officer", "man", "guard", "soldier", "registrar", "desk", "ledger"],
    wire:        ["wire", "spool", "cable", "copper", "parts"],
    radio:       ["radio", "transmitter", "console", "machine", "shortwave"],
    lookout:     ["lookout", "soldier", "guard", "watcher"],
    cabinet:     ["cabinet", "drawer", "files", "folder", "protocol", "sevres"],
    orders:      ["orders", "plans", "deployment", "file"],
    patrol:      ["patrol", "unit", "commander", "half-track", "vehicle"],
    desk:        ["desk", "drawer", "corner", "table"],
    deeds:       ["deeds", "papers", "land", "ownership"],
    station:     ["station", "relief", "worker", "table"],
    rations:     ["rations", "card", "food", "coupon"],
    fedayeen:    ["fedayeen", "fighters", "guerrillas", "commander", "recruiter", "group"]
  },
  directions: {
    east:  ["east", "e", "gangway", "pier", "right"],
    west:  ["west", "w", "ship", "deck", "left"],
    up:    ["up", "u", "ladder", "deck", "climb"],
    down:  ["down", "d", "hatch", "hold", "ladder"],
    north: ["north", "n", "trench", "lookout", "forward"],
    south: ["south", "s", "bunker", "door", "back"]
  }
};

/**
 * Flexible Parser: Resolves fuzzy text inputs into standard engine tokens
 * @param {string} rawInput - The user's untrusted text entry
 * @returns {Object} Cleaned { verb, noun } pairing
 */
function flexibleParse(rawInput) {
  const clean = rawInput.trim().toLowerCase();
  if (!clean) return { verb: "", noun: "" };

  // Strip non-essential fluff words common in student text input
  const stopWords = ["the", "a", "an", "at", "in", "into", "to", "through", "on", "inside", "with", "around"];
  const tokens = clean.split(/\s+/).filter(t => !stopWords.includes(t));

  let rawVerb = tokens[0] || "";
  let rawNoun = tokens.slice(1).join(" ") || "";

  // Check if the first word is a known non-movement verb
  let isExplicitNonMovementVerb = false;
  for (const [canonicalVerb, synonyms] of Object.entries(vocabularyMatrix.verbs)) {
    if (canonicalVerb !== "go" && synonyms.includes(rawVerb)) {
      isExplicitNonMovementVerb = true;
      break;
    }
  }

  // 1. Resolve Direction Short-cuts (only if not preceded by a non-movement verb)
  if (!isExplicitNonMovementVerb) {
    for (const word of tokens) {
      for (const [canonicalDir, synonyms] of Object.entries(vocabularyMatrix.directions)) {
        if (synonyms.includes(word)) {
          return { verb: "go", noun: canonicalDir };
        }
      }
    }
<truncated 17421 bytes>
// Missing line 1934
// Missing line 1935
// Missing line 1936
// Missing line 1937
// Missing line 1938
// Missing line 1939
// Missing line 1940
// Missing line 1941
// Missing line 1942
// Missing line 1943
// Missing line 1944
// Missing line 1945
// Missing line 1946
// Missing line 1947
// Missing line 1948
// Missing line 1949
// Missing line 1950
// Missing line 1951
// Missing line 1952
// Missing line 1953
// Missing line 1954
// Missing line 1955
// Missing line 1956
// Missing line 1957
// Missing line 1958
// Missing line 1959
// Missing line 1960
// Missing line 1961
// Missing line 1962
// Missing line 1963
// Missing line 1964
// Missing line 1965
// Missing line 1966
// Missing line 1967
// Missing line 1968
// Missing line 1969
// Missing line 1970
// Missing line 1971
// Missing line 1972
// Missing line 1973
// Missing line 1974
// Missing line 1975
// Missing line 1976
// Missing line 1977
// Missing line 1978
// Missing line 1979
// Missing line 1980
// Missing line 1981
// Missing line 1982
// Missing line 1983
// Missing line 1984
// Missing line 1985
// Missing line 1986
// Missing line 1987
// Missing line 1988
// Missing line 1989
// Missing line 1990
// Missing line 1991
// Missing line 1992
// Missing line 1993
// Missing line 1994
// Missing line 1995
// Missing line 1996
// Missing line 1997
// Missing line 1998
// Missing line 1999
// Missing line 2000
// Missing line 2001
// Missing line 2002
// Missing line 2003
// Missing line 2004
// Missing line 2005
// Missing line 2006
// Missing line 2007
// Missing line 2008
// Missing line 2009
// Missing line 2010
// Missing line 2011
// Missing line 2012
// Missing line 2013
// Missing line 2014
// Missing line 2015
// Missing line 2016
// Missing line 2017
// Missing line 2018
// Missing line 2019
// Missing line 2020
// Missing line 2021
// Missing line 2022
// Missing line 2023
// Missing line 2024
// Missing line 2025
// Missing line 2026
// Missing line 2027
// Missing line 2028
// Missing line 2029
// Missing line 2030
// Missing line 2031
// Missing line 2032
// Missing line 2033
// Missing line 2034
// Missing line 2035
// Missing line 2036
// Missing line 2037
// Missing line 2038
// Missing line 2039
// Missing line 2040
// Missing line 2041
// Missing line 2042
// Missing line 2043
// Missing line 2044
// Missing line 2045
// Missing line 2046
// Missing line 2047
// Missing line 2048
// Missing line 2049
// Missing line 2050
// Missing line 2051
// Missing line 2052
// Missing line 2053
// Missing line 2054
// Missing line 2055
// Missing line 2056
// Missing line 2057
// Missing line 2058
// Missing line 2059
// Missing line 2060
// Missing line 2061
// Missing line 2062
// Missing line 2063
// Missing line 2064
// Missing line 2065
// Missing line 2066
// Missing line 2067
// Missing line 2068
// Missing line 2069
// Missing line 2070
// Missing line 2071
// Missing line 2072
// Missing line 2073
// Missing line 2074
// Missing line 2075
// Missing line 2076
// Missing line 2077
// Missing line 2078
// Missing line 2079
// Missing line 2080
// Missing line 2081
// Missing line 2082
// Missing line 2083
// Missing line 2084
// Missing line 2085
// Missing line 2086
// Missing line 2087
// Missing line 2088
// Missing line 2089
// Missing line 2090
// Missing line 2091
// Missing line 2092
// Missing line 2093
// Missing line 2094
// Missing line 2095
// Missing line 2096
// Missing line 2097
// Missing line 2098
// Missing line 2099
// Missing line 2100
// Missing line 2101
// Missing line 2102
// Missing line 2103
// Missing line 2104
// Missing line 2105
// Missing line 2106
// Missing line 2107
// Missing line 2108
// Missing line 2109
// Missing line 2110
// Missing line 2111
// Missing line 2112
// Missing line 2113
// Missing line 2114
// Missing line 2115
// Missing line 2116
// Missing line 2117
// Missing line 2118
// Missing line 2119
// Missing line 2120
// Missing line 2121
// Missing line 2122
// Missing line 2123
// Missing line 2124
// Missing line 2125
// Missing line 2126
// Missing line 2127
// Missing line 2128
// Missing line 2129
// Missing line 2130
// Missing line 2131
// Missing line 2132
// Missing line 2133
// Missing line 2134
// Missing line 2135
// Missing line 2136
// Missing line 2137
// Missing line 2138
// Missing line 2139
// Missing line 2140
// Missing line 2141
// Missing line 2142
// Missing line 2143
// Missing line 2144
// Missing line 2145
// Missing line 2146
// Missing line 2147
// Missing line 2148
// Missing line 2149
// Missing line 2150
// Missing line 2151
// Missing line 2152
// Missing line 2153
// Missing line 2154
// Missing line 2155
// Missing line 2156
// Missing line 2157
// Missing line 2158
// Missing line 2159
// Missing line 2160
// Missing line 2161
// Missing line 2162
// Missing line 2163
// Missing line 2164
// Missing line 2165
// Missing line 2166
// Missing line 2167
// Missing line 2168
// Missing line 2169
// Missing line 2170
// Missing line 2171
// Missing line 2172
// Missing line 2173
// Missing line 2174
// Missing line 2175
// Missing line 2176
// Missing line 2177
// Missing line 2178
// Missing line 2179
// Missing line 2180
// Missing line 2181
// Missing line 2182
// Missing line 2183
// Missing line 2184
// Missing line 2185
// Missing line 2186
// Missing line 2187
// Missing line 2188
// Missing line 2189
// Missing line 2190
// Missing line 2191
// Missing line 2192
// Missing line 2193
// Missing line 2194
// Missing line 2195
// Missing line 2196
// Missing line 2197
// Missing line 2198
// Missing line 2199
// Missing line 2200
// Missing line 2201
// Missing line 2202
// Missing line 2203
// Missing line 2204
// Missing line 2205
// Missing line 2206
// Missing line 2207
// Missing line 2208
// Missing line 2209
// Missing line 2210
// Missing line 2211
// Missing line 2212
// Missing line 2213
// Missing line 2214
// Missing line 2215
// Missing line 2216
// Missing line 2217
// Missing line 2218
// Missing line 2219
// Missing line 2220
// Missing line 2221
// Missing line 2222
// Missing line 2223
// Missing line 2224
// Missing line 2225
// Missing line 2226
// Missing line 2227
// Missing line 2228
// Missing line 2229
// Missing line 2230
// Missing line 2231
        }
        AudioEngine.play('click');
        return "The lookout shouts over the sound of wind: 'Enemy armor is advancing down the sector! If we don't fix the transmitter radio inside the communications bunker and call in reinforcement coordinates, this outpost will be completely overrun!'";
      }
    }
  }

  // =============================================================
  // ACT 3 ARCHITECTURE MATRIX (THE SUEZ CRISIS OF 1956)
  // =============================================================
  if (meEpicEngine.state.chapter === 3) {
    if (verb === "go") {
      let path = noun;
      if (currentRoomData.exits[path]) {
        meEpicEngine.state.room = currentRoomData.exits[path].toUpperCase();
        AudioEngine.play('click');
        syncEngineHudDisplay();
        return "You move " + path.toUpperCase() + ".\n\n" + meEpicEngine.rooms[meEpicEngine.state.room].description;
      }
      AudioEngine.play('fail');
      return "You can't move that way here.";
    }

    if (verb === "examine") {
      if (!noun) return "What do you want to examine?";
      if (meEpicEngine.state.room === "COMMAND" && noun === "cabinet") {
        meEpicEngine.state.ch3_cabinetChecked = true;
        AudioEngine.play('success');
        return "You pull open the top drawer of the secret cabinet. Inside sits an operational file outlining a secret joint agreement: THE SÈVRES PROTOCOL. It details a plan where Israel launches a pre-emptive strike across Sinai, providing a cover excuse for Britain and France to intervene and retake the Suez Canal. You see a set of strategic military ORDERS clipped to the folder.";
      }
      if (meEpicEngine.state.room === "DUNES" && noun === "patrol") {
        AudioEngine.play('click');
        if (meEpicEngine.state.ch3_awaitingChokepoint) {
          return "The commander looks at the southern coast on his map: 'Examine the geopolitical map closely. Tell me the name of the specific geographic chokepoint where the Egyptian blockade is positioned!'";
        }
        return "The armored unit commander is checking his maps. He calls out: 'Our half-tracks are fueled and ready to push toward the canal, but we must verify our strategic campaign targets before we cross. Deliver the operational deployment orders!'";
      }
      AudioEngine.play('click');
      return "You examine the " + noun.toUpperCase() + " but find nothing unique.";
    }

    if (verb === "take") {
      if (!noun) return "What do you want to take?";
      if (meEpicEngine.state.room === "COMMAND" && noun === "orders") {
        if (!meEpicEngine.state.ch3_cabinetChecked) {
          AudioEngine.play('fail');
          return "There are no orders visible here. Inspect items in the room first.";
        }
        if (meEpicEngine.state.inventory.includes("orders")) {
          AudioEngine.play('click');
          return "You are already holding the orders.";
        }
        meEpicEngine.state.inventory.push("orders");
        AudioEngine.play('success');
      
// Missing line 2287
// Missing line 2288
// Missing line 2289
// Missing line 2290
// Missing line 2291
// Missing line 2292
// Missing line 2293
// Missing line 2294
// Missing line 2295
// Missing line 2296
// Missing line 2297
// Missing line 2298
// Missing line 2299
// Missing line 2300
// Missing line 2301
// Missing line 2302
// Missing line 2303
// Missing line 2304
// Missing line 2305
// Missing line 2306
// Missing line 2307
// Missing line 2308
// Missing line 2309
// Missing line 2310
// Missing line 2311
// Missing line 2312
// Missing line 2313
// Missing line 2314
// Missing line 2315
// Missing line 2316
// Missing line 2317
// Missing line 2318
// Missing line 2319
// Missing line 2320
// Missing line 2321
// Missing line 2322
// Missing line 2323
// Missing line 2324
// Missing line 2325
// Missing line 2326
// Missing line 2327
// Missing line 2328
// Missing line 2329
// Missing line 2330
// Missing line 2331
// Missing line 2332
// Missing line 2333
// Missing line 2334
// Missing line 2335
// Missing line 2336
// Missing line 2337
// Missing line 2338
  if (insight) {
    insight.classList.add('me-hidden');
  }

  syncEngineHudDisplay();

  if (!meParserFormBound) {
    const formElement = document.getElementById('me-parser-form');
    const inputField = document.getElementById('me-user-input');
    if (formElement && inputField) {
      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        const rawLine = inputField.value.trim();
        if (!rawLine) return;

        const logScroll = document.getElementById('me-scroll-screen');
        if (logScroll) {
          // Echo command onto terminal scrollback screen log
          const userParagraph = document.createElement('p');
          userParagraph.className = "me-user-print";
          userParagraph.innerText = "> " + rawLine.toUpperCase();
          logScroll.appendChild(userParagraph);

          // Evaluate action through state processing loops
          const feedbackReply = processCommandInterpreter(rawLine);
          if (feedbackReply) {
            const storyParagraph = document.createElement('p');
            storyParagraph.className = "me-story-text";
            storyParagraph.innerText = feedbackReply;
            logScroll.appendChild(storyParagraph);
          }

          // Reset prompt field and scroll view window down
          inputField.value = "";
          logScroll.scrollTop = logScroll.scrollHeight;
        }
      });
      meParserFormBound = true;
    }
  }
}

window.initParserGame = initParserGame;
window.meEpicEngine = meEpicEngine;
