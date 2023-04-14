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
   * cm = coma,
   * ht = parentesis,
   *
   * pt = positive,
   * dc = decimal
   * int = integer;
   *
   */

  phone : RegExp = /(^\+[0-9()]{4})([0-9 \-\s]{13}$)/;
  rfc : RegExp = /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Z\d]{3}))?$/;
  lt_num_sp_us_arr : RegExp = /^[a-zA-ZÀ-ÿ0-9 _@]*$/;
  lt_num_sp_us_dt : RegExp = /^[a-zA-ZÀ-ÿ0-9 _.]*$/;
  lt_sp_dt_cm_pr : RegExp = /^[a-zA-ZÀ-ÿ .,()]*$/;
  lt_num_sp_us : RegExp = /^[a-zA-ZÀ-ÿ0-9 _]*$/;
  lt_num_sp : RegExp = /^[a-zA-ZÀ-ÿ0-9 ]*$/;
  ptIntNum : RegExp = /^[1-9]+[0-9]*$/;
  lt_sp_dt : RegExp = /^[a-zA-ZÀ-ÿ .]*$/;
  lt_sp : RegExp = /^[a-zA-ZÀ-ÿ ]*$/;

  constructor() { }
}
