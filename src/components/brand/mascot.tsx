// ⚑ Mascota vectorizada de los mocks y del menú real: public/brand/mascota-{sentada,bandera,saludo}.svg.
// Para usar la oficial reemplaza esos archivos (mismo nombre, sin ojos) y los paths de `eyes`.
// Los ojos van en mascot.tsx (capa aparte) para que el parpadeo no repinte la imagen.
import Image from 'next/image'

const poses = {
  sit: {
    src: '/brand/mascota-sentada.svg',
    width: 1328,
    height: 819,
    viewBox: '-49 -49 1328 819',
    origin: '42.7% 31.3%',
    eyes: 'M 572 185 C 567 187, 556 197, 556 199 C 556 200, 555 202, 554 205 C 551 210, 551 216, 555 220 C 559 227, 564 226, 566 220 C 566 216, 571 208, 574 204 C 577 201, 578 201, 583 201 C 589 201, 588 201, 598 212 C 602 217, 605 217, 608 213 C 614 206, 605 191, 592 185 C 584 181, 579 181, 572 185 M 443 196 C 438 199, 433 203, 429 209 C 423 220, 424 232, 432 232 C 434 232, 438 227, 440 221 C 442 216, 446 213, 451 213 C 457 213, 459 215, 463 223 C 467 231, 468 233, 472 231 C 475 230, 479 225, 479 222 C 479 220, 478 216, 476 213 C 471 199, 456 191, 443 196',
  },
  flag: {
    src: '/brand/mascota-bandera.svg',
    width: 1178,
    height: 959,
    viewBox: '-44 -44 1178 959',
    origin: '82.2% 39.9%',
    eyes: 'M 963 318 C 950 324, 944 334, 942 347 C 942 352, 942 352, 947 358 C 953 366, 954 366, 955 361 C 955 359, 956 356, 957 355 C 958 354, 960 351, 961 348 C 963 340, 966 335, 970 335 C 974 335, 979 342, 980 349 C 981 355, 986 358, 991 356 C 997 355, 998 350, 996 341 C 991 322, 975 311, 963 318 M 871 323 C 856 327, 850 348, 861 360 C 865 365, 866 365, 871 365 C 878 365, 883 362, 887 355 C 897 342, 885 320, 871 323',
  },
  wave: {
    src: '/brand/mascota-saludo.svg',
    width: 1270,
    height: 791,
    viewBox: '-47 -47 1270 791',
    origin: '68.9% 29.1%',
    eyes: 'M 770 167 C 758 172, 751 186, 755 195 C 758 201, 764 199, 768 192 C 770 187, 775 183, 778 183 C 781 183, 784 188, 786 194 C 787 201, 791 204, 796 201 C 806 196, 799 173, 785 167 C 779 165, 776 165, 770 167 M 870 163 C 867 164, 856 175, 854 178 C 852 183, 853 193, 856 196 C 860 200, 864 199, 867 192 C 869 188, 871 184, 871 183 C 874 177, 885 178, 889 185 C 891 189, 896 195, 898 195 C 901 195, 905 189, 905 185 C 905 179, 900 171, 893 166 C 888 163, 887 162, 880 162 C 876 162, 871 162, 870 163',
  },
}

/**
 * Wrapper: posición y entrada (className). Adentro, cuerpo (imagen estática) + ojos (capa propia) para que el
 * parpadeo y el saludo sean transforms del compositor: la imagen nunca se vuelve a pintar. Al tocarla, corazones.
 */
export function Mascot({ pose = 'sit', priority = false, className = '' }: { pose?: keyof typeof poses; priority?: boolean; className?: string }) {
  const p = poses[pose]
  return (
    <span data-mascot data-hearts data-loop className={`block cursor-pointer ${className}`}>
      <span className="mascot-react relative block">
        <Image
          src={p.src}
          width={p.width}
          height={p.height}
          alt=""
          unoptimized
          draggable={false}
          loading={priority ? 'eager' : 'lazy'}
          className="block h-auto w-full select-none"
        />
        <svg viewBox={p.viewBox} className="mascot-eyes absolute inset-0 size-full" style={{ transformOrigin: p.origin }} aria-hidden="true">
          <path fill="var(--color-ink)" fillRule="evenodd" d={p.eyes} />
        </svg>
      </span>
    </span>
  )
}

/** Pin del mapa con la cara de la mascota (tapa 3D, ojos felices, sonrisa y hoyuelo). */
export function MascotPin({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" className={`pin-bob ${className}`} aria-hidden="true" data-loop>
      <path d="M40 97S6 62 6 38a34 34 0 1 1 68 0c0 24-34 59-34 59z" fill="var(--color-coral)" />
      <g fill="#fffdf5" stroke="var(--color-ink)" strokeWidth={3.4} strokeLinejoin="round" strokeLinecap="round">
        <path d="M51 21h3.5a4.5 4.5 0 0 1 4.5 4.5V49a7 7 0 0 1-7 7h-2z" />
        <path d="M24 20.5a5.5 5.5 0 0 1 5.5-5.5H51a5 5 0 0 1 5 5v4.5H24z" />
        <path d="M24 24.5h28V50a7 7 0 0 1-7 7H31a7 7 0 0 1-7-7z" />
        <path d="M30.5 36q2.5-3.2 5 0M40.5 36q2.5-3.2 5 0M31.5 42.5q6.5 6.5 13 0" fill="none" strokeWidth={2.6} />
      </g>
      <circle cx="47.5" cy="40.5" r="1.3" fill="var(--color-ink)" />
    </svg>
  )
}
