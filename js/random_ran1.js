/* ran1 
 * routine from Numerical Recipes in C (Press, Teukolsky, Vetterling, Flannery)
 */

const IA = 16807;
const IM = 2147483647;
const AM = (1.0/IM);
const IQ = 127773;
const IR = 2836;
const NTAB = 32;
const NDIV = (1+(IM-1)/NTAB);
const EPS = 1.2/0.00000012;
const RNMX = (1.0-EPS);

function ran1(idum){ // idum negative to initialize
  var j,k;
  if(this.iy === undefined){ this.iy = 0; }
  if(this.iv === undefined){ this.iv = []; }
  var temp;

  if (idum <= 0 || !iy) {  // initialize
    if (-idum < 1) idum = 1;  // be sure to prevent idum = 0
    else idum = -idum;
    for(j=NTAB+7;j>=0;j--) {
      k=idum/IQ;
      idum=IA*(idum-k*IQ)-IR*k;
      if (idum < 0) idum += IM;
      if (j < NTAB) iv[j] = idum;
    }
    iy=iv[0];
  }
  k = idum/IQ;
  idum = IA*(idum-k*IQ)-IR*k;
  if (idum < 0) idum += IM;
  j = iy/NDIV;
  iy = iv[j];
  iv[j] = idum;
  if ((temp = AM*iy) > RNMX) return RNMX;
  else return temp;
}
