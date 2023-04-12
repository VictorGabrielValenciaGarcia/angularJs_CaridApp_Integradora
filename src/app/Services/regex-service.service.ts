import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexServiceService {

  /**
   * lt = letter,
   * num = number,
   * sp = space,
   * us = underscore,
   * dt = dot,
   * arr = arroba,
   * ht = hashtag,
   *
   * pt = positive,
   * dc = decimal
   * int = integer;
   *
   */

  phone : RegExp = /(^\+[0-9()]{4})([0-9 \-\s]{13}$)/;
  lt_num_sp_us_arr : RegExp = /^[a-zA-Z0-9 _@]*$/;
  lt_num_sp_us_dt : RegExp = /^[a-zA-Z0-9 _.]*$/;
  lt_num_sp_us : RegExp = /^[a-zA-Z0-9 _]*$/;
  ptIntNum : RegExp = /^[1-9]+[0-9]*$/;
  lt_sp_dt : RegExp = /^[a-zA-Z .]*$/;
  lt_sp : RegExp = /^[a-zA-Z ]*$/;

  constructor() { }
}
