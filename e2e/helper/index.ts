import { html_beautify } from 'js-beautify';
import { getRevision } from '@/utils/version';
import { getVersion } from '@/utils/version';

/**
 * Remove environment-dependent items from HTML so that snapshots are
 * identical in CI and local environments.
 * 
 * @param html 
 */

export const stripEnviromnentalFactorsFromHTML = (snapshotHtml: string) => {
  let result = snapshotHtml;
  
  /*
   * Delete revision and version
   */
  result = result.replace(getVersion(), "${version}");
  result = result.replace(getRevision(), "${revision}");

  /*
   * Replace line breaks with "\n"
   */
  result = result.replace('\r\n', '\n');

  /*
   * Remove information that may contain environment-dependent content.
   */
  const removeWords = [
    /<noscript.*?>.*?<\/noscript>/gms,
    /<script.*?>.*?<\/script>/gms,
    /<style.*?>.*?<\/style>/gms,
    / style.*?=".*?"/gms,
    /*
    / aria-.*?=".*?"/gms,
    / data-.*?=".*?"/gms,
    / id=".*?"/gms,
    / for=".*?"/gms,
    / checked=".*?"/gms,
    / value=".*?"/gms,
    */
    /\?v=[0-9]*/gms
  ];
  removeWords.forEach((re) => {
    result = result.replace(re, "");
  })

  result = `<snapshot>${result}</snapshot>`;
  return html_beautify(result, { indent_size: 2 });
}
