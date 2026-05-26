// ============================================================
// BALANCE CORE MÉXICO — Datos Reales Embebidos
// Fuentes: CONAPO (IIM 2020, IME 2020), INEGI (ENDUTIH), CONAGUA
// ============================================================

const DATA = {

  // --- ÍNDICE DE INTENSIDAD MIGRATORIA MÉXICO-EUA 2020 (CONAPO) ---
  iim: [
    {"cve_ent":1,"nom_ent":"Aguascalientes","viv_tot":387762,"viv_rem":7.124675365,"viv_emig":1.96788104,"viv_circ":0.73937727,"viv_ret":0.98626504,"iim_dp2":18.28892,"gim_dp2":"Alto","pos_nal":6},
    {"cve_ent":2,"nom_ent":"Baja California","viv_tot":1138917,"viv_rem":6.099585501,"viv_emig":1.2922104,"viv_circ":0.30774455,"viv_ret":1.76528203,"iim_dp2":19.48624,"gim_dp2":"Medio","pos_nal":13},
    {"cve_ent":3,"nom_ent":"Baja California Sur","viv_tot":239229,"viv_rem":2.229615068,"viv_emig":0.35747025,"viv_circ":0.14357412,"viv_ret":0.46585868,"iim_dp2":21.80775,"gim_dp2":"Muy bajo","pos_nal":27},
    {"cve_ent":4,"nom_ent":"Campeche","viv_tot":261683,"viv_rem":2.021442366,"viv_emig":0.3696009,"viv_circ":0.11210462,"viv_ret":0.37299515,"iim_dp2":21.88772,"gim_dp2":"Muy bajo","pos_nal":29},
    {"cve_ent":5,"nom_ent":"Coahuila","viv_tot":897605,"viv_rem":4.005261883,"viv_emig":0.87058527,"viv_circ":0.20894046,"viv_ret":0.51633077,"iim_dp2":20.90201,"gim_dp2":"Bajo","pos_nal":21},
    {"cve_ent":6,"nom_ent":"Colima","viv_tot":225927,"viv_rem":6.952366612,"viv_emig":1.22313976,"viv_circ":0.63532232,"viv_ret":1.04742173,"iim_dp2":19.44441,"gim_dp2":"Medio","pos_nal":12},
    {"cve_ent":7,"nom_ent":"Chiapas","viv_tot":1341763,"viv_rem":2.45253909,"viv_emig":0.72819412,"viv_circ":0.14602703,"viv_ret":0.29155847,"iim_dp2":21.36297,"gim_dp2":"Bajo","pos_nal":24},
    {"cve_ent":8,"nom_ent":"Chihuahua","viv_tot":1136792,"viv_rem":5.538809511,"viv_emig":1.53796112,"viv_circ":0.43167281,"viv_ret":0.99836321,"iim_dp2":19.3703,"gim_dp2":"Medio","pos_nal":11},
    {"cve_ent":9,"nom_ent":"Ciudad de México","viv_tot":2720459,"viv_rem":2.010496413,"viv_emig":0.35915545,"viv_circ":0.14473703,"viv_ret":0.23571819,"iim_dp2":21.92447,"gim_dp2":"Muy bajo","pos_nal":30},
    {"cve_ent":10,"nom_ent":"Durango","viv_tot":488959,"viv_rem":10.24834101,"viv_emig":1.76346441,"viv_circ":0.45983801,"viv_ret":1.35071269,"iim_dp2":18.63932,"gim_dp2":"Alto","pos_nal":8},
    {"cve_ent":11,"nom_ent":"Guanajuato","viv_tot":1569609,"viv_rem":8.749360254,"viv_emig":2.33530529,"viv_circ":0.74965305,"viv_ret":1.12816313,"iim_dp2":17.62342,"gim_dp2":"Muy alto","pos_nal":4},
    {"cve_ent":12,"nom_ent":"Guerrero","viv_tot":945033,"viv_rem":10.93798496,"viv_emig":2.04435182,"viv_circ":0.23888124,"viv_ret":1.0610411,"iim_dp2":18.65848,"gim_dp2":"Alto","pos_nal":9},
    {"cve_ent":13,"nom_ent":"Hidalgo","viv_tot":852532,"viv_rem":6.057521267,"viv_emig":1.73647695,"viv_circ":0.55009407,"viv_ret":1.03433465,"iim_dp2":18.89264,"gim_dp2":"Alto","pos_nal":10},
    {"cve_ent":14,"nom_ent":"Jalisco","viv_tot":2318144,"viv_rem":6.760315687,"viv_emig":1.27645815,"viv_circ":0.43081759,"viv_ret":0.92893934,"iim_dp2":19.7143,"gim_dp2":"Medio","pos_nal":14},
    {"cve_ent":15,"nom_ent":"México","viv_tot":4492744,"viv_rem":2.240482905,"viv_emig":0.46429604,"viv_circ":0.11335544,"viv_ret":0.2922682,"iim_dp2":21.78351,"gim_dp2":"Muy bajo","pos_nal":26},
    {"cve_ent":16,"nom_ent":"Michoacán","viv_tot":1285663,"viv_rem":12.2637937,"viv_emig":2.23582993,"viv_circ":0.73313062,"viv_ret":1.47818141,"iim_dp2":17.45943,"gim_dp2":"Muy alto","pos_nal":2},
    {"cve_ent":17,"nom_ent":"Morelos","viv_tot":561530,"viv_rem":7.011981337,"viv_emig":1.1405085,"viv_circ":0.32759477,"viv_ret":0.98285926,"iim_dp2":20.00671,"gim_dp2":"Medio","pos_nal":17},
    {"cve_ent":18,"nom_ent":"Nayarit","viv_tot":359139,"viv_rem":11.56301641,"viv_emig":2.06729454,"viv_circ":0.94348576,"viv_ret":1.27573266,"iim_dp2":17.53613,"gim_dp2":"Muy alto","pos_nal":3},
    {"cve_ent":19,"nom_ent":"Nuevo León","viv_tot":1641329,"viv_rem":2.197477191,"viv_emig":0.57619992,"viv_circ":0.22529448,"viv_ret":0.48182144,"iim_dp2":21.38607,"gim_dp2":"Bajo","pos_nal":25},
    {"cve_ent":20,"nom_ent":"Oaxaca","viv_tot":1127035,"viv_rem":7.602931559,"viv_emig":2.12229518,"viv_circ":0.24118002,"viv_ret":1.19099823,"iim_dp2":18.6325,"gim_dp2":"Alto","pos_nal":7},
    {"cve_ent":21,"nom_ent":"Puebla","viv_tot":1698359,"viv_rem":5.056233082,"viv_emig":1.01349717,"viv_circ":0.23437417,"viv_ret":0.66571873,"iim_dp2":20.54996,"gim_dp2":"Bajo","pos_nal":20},
    {"cve_ent":22,"nom_ent":"Querétaro","viv_tot":661248,"viv_rem":4.160910187,"viv_emig":1.20515152,"viv_circ":0.53121212,"viv_ret":0.69068342,"iim_dp2":19.90709,"gim_dp2":"Medio","pos_nal":15},
    {"cve_ent":23,"nom_ent":"Quintana Roo","viv_tot":563025,"viv_rem":1.883127926,"viv_emig":0.26294567,"viv_circ":0.09684661,"viv_ret":0.35248816,"iim_dp2":22.07284,"gim_dp2":"Muy bajo","pos_nal":31},
    {"cve_ent":24,"nom_ent":"San Luis Potosí","viv_tot":768744,"viv_rem":7.78372932,"viv_emig":2.10487618,"viv_circ":0.53788673,"viv_ret":1.1465746,"iim_dp2":18.26618,"gim_dp2":"Alto","pos_nal":5},
    {"cve_ent":25,"nom_ent":"Sinaloa","viv_tot":850946,"viv_rem":6.188922397,"viv_emig":1.26688225,"viv_circ":0.26015701,"viv_ret":0.53660091,"iim_dp2":20.1744,"gim_dp2":"Medio","pos_nal":18},
    {"cve_ent":26,"nom_ent":"Sonora","viv_tot":880189,"viv_rem":4.049484461,"viv_emig":1.33529705,"viv_circ":0.30480101,"viv_ret":0.80138029,"iim_dp2":19.98594,"gim_dp2":"Medio","pos_nal":16},
    {"cve_ent":27,"nom_ent":"Tabasco","viv_tot":673087,"viv_rem":1.782959332,"viv_emig":0.26546236,"viv_circ":0.09076908,"viv_ret":0.14101711,"iim_dp2":22.18398,"gim_dp2":"Muy bajo","pos_nal":32},
    {"cve_ent":28,"nom_ent":"Tamaulipas","viv_tot":1064578,"viv_rem":4.514149156,"viv_emig":1.0877801,"viv_circ":0.2560147,"viv_ret":0.74135005,"iim_dp2":20.40484,"gim_dp2":"Bajo","pos_nal":19},
    {"cve_ent":29,"nom_ent":"Tlaxcala","viv_tot":340984,"viv_rem":2.976323348,"viv_emig":0.6152472,"viv_circ":0.32701535,"viv_ret":0.61934793,"iim_dp2":21.09241,"gim_dp2":"Bajo","pos_nal":23},
    {"cve_ent":30,"nom_ent":"Veracruz","viv_tot":2390035,"viv_rem":3.531583177,"viv_emig":0.82811186,"viv_circ":0.20526674,"viv_ret":0.45124767,"iim_dp2":21.01848,"gim_dp2":"Bajo","pos_nal":22},
    {"cve_ent":31,"nom_ent":"Yucatán","viv_tot":661382,"viv_rem":2.118889364,"viv_emig":0.35276359,"viv_circ":0.1541259,"viv_ret":0.34997335,"iim_dp2":21.8607,"gim_dp2":"Muy bajo","pos_nal":28},
    {"cve_ent":32,"nom_ent":"Zacatecas","viv_tot":443484,"viv_rem":13.24367881,"viv_emig":3.04442605,"viv_circ":0.87739531,"viv_ret":1.89060181,"iim_dp2":15.8963,"gim_dp2":"Muy alto","pos_nal":1}
  ],

  // --- ÍNDICE DE MARGINACIÓN ESTATAL 2020 (CONAPO) ---
  ime: [
    {"CVE_ENT":1,"NOM_ENT":"Aguascalientes","IM_2020":22.2057,"GM_2020":"Muy bajo","ANALF":2.11,"SBASC":23.58,"OVSDE":0.35,"OVSEE":0.23,"OVSAE":0.55,"OVPT":0.77,"VHAC":13.13,"PL_5000":21.27,"PO2SM":58.50},
    {"CVE_ENT":2,"NOM_ENT":"Baja California","IM_2020":21.3803,"GM_2020":"Bajo","ANALF":1.83,"SBASC":24.68,"OVSDE":0.20,"OVSEE":0.58,"OVSAE":2.10,"OVPT":1.91,"VHAC":14.59,"PL_5000":8.46,"PO2SM":73.55},
    {"CVE_ENT":3,"NOM_ENT":"Baja California Sur","IM_2020":21.4734,"GM_2020":"Bajo","ANALF":2.34,"SBASC":23.98,"OVSDE":0.42,"OVSEE":0.96,"OVSAE":5.39,"OVPT":5.06,"VHAC":18.60,"PL_5000":10.28,"PO2SM":45.49},
    {"CVE_ENT":4,"NOM_ENT":"Campeche","IM_2020":17.8051,"GM_2020":"Alto","ANALF":5.86,"SBASC":29.78,"OVSDE":2.52,"OVSEE":1.05,"OVSAE":3.98,"OVPT":2.69,"VHAC":29.97,"PL_5000":29.92,"PO2SM":70.01},
    {"CVE_ENT":5,"NOM_ENT":"Coahuila","IM_2020":22.5457,"GM_2020":"Muy bajo","ANALF":1.67,"SBASC":21.49,"OVSDE":0.30,"OVSEE":0.17,"OVSAE":0.94,"OVPT":0.75,"VHAC":13.48,"PL_5000":10.04,"PO2SM":60.03},
    {"CVE_ENT":6,"NOM_ENT":"Colima","IM_2020":21.5323,"GM_2020":"Bajo","ANALF":3.37,"SBASC":27.82,"OVSDE":0.27,"OVSEE":0.33,"OVSAE":0.66,"OVPT":2.62,"VHAC":15.31,"PL_5000":13.50,"PO2SM":59.73},
    {"CVE_ENT":7,"NOM_ENT":"Chiapas","IM_2020":11.9987,"GM_2020":"Muy alto","ANALF":13.70,"SBASC":48.12,"OVSDE":2.46,"OVSEE":1.80,"OVSAE":10.68,"OVPT":12.39,"VHAC":36.09,"PL_5000":57.64,"PO2SM":85.57},
    {"CVE_ENT":8,"NOM_ENT":"Chihuahua","IM_2020":20.0153,"GM_2020":"Medio","ANALF":2.63,"SBASC":27.30,"OVSDE":1.42,"OVSEE":1.66,"OVSAE":1.66,"OVPT":2.18,"VHAC":13.60,"PL_5000":14.39,"PO2SM":66.70},
    {"CVE_ENT":9,"NOM_ENT":"Ciudad de México","IM_2020":23.1431,"GM_2020":"Muy bajo","ANALF":1.43,"SBASC":17.64,"OVSDE":0.05,"OVSEE":0.05,"OVSAE":1.24,"OVPT":0.63,"VHAC":14.40,"PL_5000":1.01,"PO2SM":56.13},
    {"CVE_ENT":10,"NOM_ENT":"Durango","IM_2020":18.4727,"GM_2020":"Alto","ANALF":2.73,"SBASC":27.49,"OVSDE":2.84,"OVSEE":2.09,"OVSAE":2.31,"OVPT":4.26,"VHAC":16.21,"PL_5000":32.50,"PO2SM":69.26},
    {"CVE_ENT":11,"NOM_ENT":"Guanajuato","IM_2020":19.4195,"GM_2020":"Medio","ANALF":5.29,"SBASC":33.53,"OVSDE":1.93,"OVSEE":0.38,"OVSAE":2.91,"OVPT":2.42,"VHAC":16.90,"PL_5000":33.26,"PO2SM":67.09},
    {"CVE_ENT":12,"NOM_ENT":"Guerrero","IM_2020":10.9892,"GM_2020":"Muy alto","ANALF":12.47,"SBASC":42.55,"OVSDE":9.38,"OVSEE":1.41,"OVSAE":11.55,"OVPT":15.27,"VHAC":32.86,"PL_5000":48.15,"PO2SM":80.28},
    {"CVE_ENT":13,"NOM_ENT":"Hidalgo","IM_2020":18.0532,"GM_2020":"Alto","ANALF":6.62,"SBASC":29.91,"OVSDE":1.90,"OVSEE":0.64,"OVSAE":3.87,"OVPT":2.85,"VHAC":18.52,"PL_5000":53.83,"PO2SM":73.95},
    {"CVE_ENT":14,"NOM_ENT":"Jalisco","IM_2020":21.8151,"GM_2020":"Bajo","ANALF":2.90,"SBASC":29.54,"OVSDE":0.57,"OVSEE":0.30,"OVSAE":0.75,"OVPT":1.66,"VHAC":14.02,"PL_5000":16.16,"PO2SM":55.86},
    {"CVE_ENT":15,"NOM_ENT":"México","IM_2020":20.8036,"GM_2020":"Bajo","ANALF":2.90,"SBASC":24.96,"OVSDE":1.21,"OVSEE":0.26,"OVSAE":2.78,"OVPT":2.08,"VHAC":20.70,"PL_5000":19.15,"PO2SM":66.00},
    {"CVE_ENT":16,"NOM_ENT":"Michoacán","IM_2020":18.2808,"GM_2020":"Alto","ANALF":7.05,"SBASC":42.41,"OVSDE":1.37,"OVSEE":0.49,"OVSAE":2.82,"OVPT":5.59,"VHAC":18.83,"PL_5000":37.53,"PO2SM":70.62},
    {"CVE_ENT":17,"NOM_ENT":"Morelos","IM_2020":19.814,"GM_2020":"Medio","ANALF":4.45,"SBASC":27.53,"OVSDE":0.73,"OVSEE":0.30,"OVSAE":4.22,"OVPT":4.10,"VHAC":19.28,"PL_5000":26.13,"PO2SM":73.59},
    {"CVE_ENT":18,"NOM_ENT":"Nayarit","IM_2020":17.5160,"GM_2020":"Alto","ANALF":4.49,"SBASC":29.05,"OVSDE":3.97,"OVSEE":2.13,"OVSAE":3.02,"OVPT":3.99,"VHAC":18.01,"PL_5000":36.47,"PO2SM":64.82},
    {"CVE_ENT":19,"NOM_ENT":"Nuevo León","IM_2020":23.4443,"GM_2020":"Muy bajo","ANALF":1.47,"SBASC":19.07,"OVSDE":0.10,"OVSEE":0.11,"OVSAE":0.70,"OVPT":0.79,"VHAC":13.20,"PL_5000":5.14,"PO2SM":46.79},
    {"CVE_ENT":20,"NOM_ENT":"Oaxaca","IM_2020":13.2164,"GM_2020":"Muy alto","ANALF":11.82,"SBASC":45.28,"OVSDE":1.94,"OVSEE":1.92,"OVSAE":10.00,"OVPT":13.99,"VHAC":29.45,"PL_5000":59.40,"PO2SM":78.85},
    {"CVE_ENT":21,"NOM_ENT":"Puebla","IM_2020":17.7216,"GM_2020":"Alto","ANALF":6.97,"SBASC":36.87,"OVSDE":1.13,"OVSEE":0.61,"OVSAE":4.66,"OVPT":5.34,"VHAC":25.53,"PL_5000":36.08,"PO2SM":77.30},
    {"CVE_ENT":22,"NOM_ENT":"Querétaro","IM_2020":20.8382,"GM_2020":"Bajo","ANALF":3.48,"SBASC":23.63,"OVSDE":1.66,"OVSEE":0.47,"OVSAE":2.13,"OVPT":2.02,"VHAC":15.13,"PL_5000":28.83,"PO2SM":57.08},
    {"CVE_ENT":23,"NOM_ENT":"Quintana Roo","IM_2020":20.6289,"GM_2020":"Medio","ANALF":3.07,"SBASC":22.53,"OVSDE":1.14,"OVSEE":0.82,"OVSAE":1.66,"OVPT":2.42,"VHAC":26.13,"PL_5000":11.47,"PO2SM":57.26},
    {"CVE_ENT":24,"NOM_ENT":"San Luis Potosí","IM_2020":18.688,"GM_2020":"Medio","ANALF":5.02,"SBASC":29.32,"OVSDE":1.52,"OVSEE":1.18,"OVSAE":7.64,"OVPT":4.97,"VHAC":16.77,"PL_5000":36.03,"PO2SM":64.88},
    {"CVE_ENT":25,"NOM_ENT":"Sinaloa","IM_2020":20.5099,"GM_2020":"Medio","ANALF":3.56,"SBASC":28.86,"OVSDE":1.37,"OVSEE":0.40,"OVSAE":1.40,"OVPT":2.26,"VHAC":18.87,"PL_5000":29.26,"PO2SM":61.77},
    {"CVE_ENT":26,"NOM_ENT":"Sonora","IM_2020":21.4056,"GM_2020":"Bajo","ANALF":1.99,"SBASC":22.41,"OVSDE":0.66,"OVSEE":0.66,"OVSAE":1.30,"OVPT":2.42,"VHAC":16.62,"PL_5000":15.16,"PO2SM":63.22},
    {"CVE_ENT":27,"NOM_ENT":"Tabasco","IM_2020":18.3325,"GM_2020":"Alto","ANALF":5.09,"SBASC":29.17,"OVSDE":1.76,"OVSEE":0.49,"OVSAE":6.18,"OVPT":3.37,"VHAC":26.09,"PL_5000":53.27,"PO2SM":71.75},
    {"CVE_ENT":28,"NOM_ENT":"Tamaulipas","IM_2020":20.9966,"GM_2020":"Bajo","ANALF":2.58,"SBASC":25.79,"OVSDE":0.25,"OVSEE":0.43,"OVSAE":1.62,"OVPT":1.42,"VHAC":17.43,"PL_5000":11.24,"PO2SM":76.27},
    {"CVE_ENT":29,"NOM_ENT":"Tlaxcala","IM_2020":19.8707,"GM_2020":"Medio","ANALF":3.35,"SBASC":26.94,"OVSDE":0.90,"OVSEE":0.41,"OVSAE":0.89,"OVPT":1.80,"VHAC":22.24,"PL_5000":32.13,"PO2SM":78.81},
    {"CVE_ENT":30,"NOM_ENT":"Veracruz","IM_2020":16.4142,"GM_2020":"Alto","ANALF":8.50,"SBASC":39.88,"OVSDE":1.26,"OVSEE":1.07,"OVSAE":8.67,"OVPT":5.98,"VHAC":23.09,"PL_5000":45.86,"PO2SM":78.12},
    {"CVE_ENT":31,"NOM_ENT":"Yucatán","IM_2020":17.5122,"GM_2020":"Alto","ANALF":6.00,"SBASC":31.55,"OVSDE":5.87,"OVSEE":0.69,"OVSAE":1.06,"OVPT":1.41,"VHAC":26.17,"PL_5000":23.32,"PO2SM":69.68},
    {"CVE_ENT":32,"NOM_ENT":"Zacatecas","IM_2020":19.4972,"GM_2020":"Medio","ANALF":3.76,"SBASC":32.31,"OVSDE":2.32,"OVSEE":0.46,"OVSAE":1.83,"OVPT":1.25,"VHAC":16.25,"PL_5000":44.42,"PO2SM":71.92}
  ],

  // --- USUARIOS DE INTERNET POR EDAD (ENDUTIH-INEGI) 2023 ---
  internet: {
    "2023": [
      {"edad":"6-11 años","porcentaje_total":31.5,"porcentaje_hombres":31.2,"porcentaje_mujeres":31.9},
      {"edad":"12-17 años","porcentaje_total":51.9,"porcentaje_hombres":50.0,"porcentaje_mujeres":53.9},
      {"edad":"18-25 años","porcentaje_total":56.0,"porcentaje_hombres":54.8,"porcentaje_mujeres":57.2},
      {"edad":"26-49 años","porcentaje_total":40.9,"porcentaje_hombres":43.6,"porcentaje_mujeres":38.5},
      {"edad":"50-59 años","porcentaje_total":25.6,"porcentaje_hombres":27.0,"porcentaje_mujeres":24.5},
      {"edad":"60+ años","porcentaje_total":13.9,"porcentaje_hombres":16.9,"porcentaje_mujeres":11.3}
    ]
  },

  // --- ACUÍFEROS SUBTERRÁNEOS POR ESTADO (CONAGUA) ---
  agua: [
    {"estado":"Aguascalientes","acuiferos":33},
    {"estado":"Baja California","acuiferos":98},
    {"estado":"Baja California Sur","acuiferos":42},
    {"estado":"Campeche","acuiferos":13},
    {"estado":"Chiapas","acuiferos":32},
    {"estado":"Chihuahua","acuiferos":158},
    {"estado":"Ciudad de México","acuiferos":25},
    {"estado":"Coahuila","acuiferos":120},
    {"estado":"Colima","acuiferos":50},
    {"estado":"Durango","acuiferos":45},
    {"estado":"Guanajuato","acuiferos":94},
    {"estado":"Guerrero","acuiferos":60},
    {"estado":"Hidalgo","acuiferos":87},
    {"estado":"Jalisco","acuiferos":57},
    {"estado":"Michoacán","acuiferos":42},
    {"estado":"Morelos","acuiferos":50},
    {"estado":"México","acuiferos":66},
    {"estado":"Nayarit","acuiferos":35},
    {"estado":"Nuevo León","acuiferos":51},
    {"estado":"Oaxaca","acuiferos":49},
    {"estado":"Puebla","acuiferos":44},
    {"estado":"Querétaro","acuiferos":67},
    {"estado":"Quintana Roo","acuiferos":50},
    {"estado":"San Luis Potosí","acuiferos":65},
    {"estado":"Sinaloa","acuiferos":58},
    {"estado":"Sonora","acuiferos":118},
    {"estado":"Tabasco","acuiferos":9},
    {"estado":"Tamaulipas","acuiferos":36},
    {"estado":"Tlaxcala","acuiferos":23},
    {"estado":"Veracruz","acuiferos":118},
    {"estado":"Yucatán","acuiferos":33},
    {"estado":"Zacatecas","acuiferos":103}
  ]
};

// Lookup helpers
function getIIM(stateName) {
  return DATA.iim.find(d => d.nom_ent === stateName || d.nom_ent.includes(stateName.split(' ')[0]));
}
function getIME(stateName) {
  return DATA.ime.find(d => d.NOM_ENT === stateName || d.NOM_ENT.includes(stateName.split(' ')[0]));
}
function getAgua(stateName) {
  const key = stateName === 'Michoacán' ? 'Michoacán' : stateName === 'México' ? 'México' : stateName;
  return DATA.agua.find(d => d.estado === key || d.estado.includes(stateName.split(' ')[0]));
}
