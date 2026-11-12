const SIGN_POST_ROW = "......nn..................nn......";
const SIGN_POST_HEIGHT = 15;
const FINISH_POLE_ROW = "nn....................................nn";
const FINISH_POLE_HEIGHT = 15;
const FLAG_POLE_ROW = "P.......";

const repeatRow = (row: string, count: number): string[] => {
    return Array.from({ length: count }, () => {
        return row;
    });
};

const SIGN_START_BOARD = [
    "ssssssssssssssssssssssssssssssssss",
    "mkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkm",
    "mkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkm",
    "mkkgggkgggkkgkkggkkgggkkkkskkkkkkm",
    "mkkgkkkkgkkgkgkgkgkkgkkkkkkskkkkkm",
    "mkkgggkkgkkgggkggkkkgkkkkkkkskkkkm",
    "mkkkkgkkgkkgkgkgkgkkgkkkkkkskkkkkm",
    "mkkgggkkgkkgkgkgkgkkgkkkkkskkkkkkm",
    "mkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkm",
    "mkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkm",
    "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
];

const SIGN_START_ROWS = [...SIGN_START_BOARD, ...repeatRow(SIGN_POST_ROW, SIGN_POST_HEIGHT)];

const FINISH_BANNER = [
    "ss....................................ss",
    "nn....................................nn",
    "nnkkmmkkmmkkmmkkmmkkmmkkmmkkmmkkmmkkmmnn",
    "nnkkmmkkmmkkmmkkmmkkmmkkmmkkmmkkmmkkmmnn",
    "nnmmkkmmkkmmkkmmkkmmkkmmkkmmkkmmkkmmkknn",
    "nnmmkkmmkkmmkkmmkkmmkkmmkkmmkkmmkkmmkknn",
    "nnkkmmkkmmkkmmkkmmkkmmkkmmkkmmkkmmkkmmnn",
    "nnkkmmkkmmkkmmkkmmkkmmkkmmkkmmkkmmkkmmnn",
    "nnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkknn",
    "nnkkkkkkgggkgggkgkkgkgggkgggkgkgkkkkkknn",
    "nnkkkkkkgkkkkgkkggkgkkgkkgkkkgkgkkkkkknn",
    "nnkkkkkkggkkkgkkgkggkkgkkgggkgggkkkkkknn",
    "nnkkkkkkgkkkkgkkgkkgkkgkkkkgkgkgkkkkkknn",
    "nnkkkkkkgkkkgggkgkkgkgggkgggkgkgkkkkkknn",
    "nnkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkknn",
];

const FINISH_ROWS = [...FINISH_BANNER, ...repeatRow(FINISH_POLE_ROW, FINISH_POLE_HEIGHT)];

const BURROW_ROWS = [
    "..........mmmmmmmmmm..........",
    "........mmnnnnnnnnnnmm........",
    ".....mmmnnnnnnnnnnnnnnmmm.....",
    "...mmnnnnnnkkkkkkkknnnnnnmm...",
    "mmmnnnnnnnkkkkkkkkkknnnnnnnmmm",
    "nnnnnnnnnnkkkkkkkkkknnnnnnnnnn",
    "nnnnnnnnnkkkkkkkkkkkknnnnnnnnn",
    "nnnnnnnnnkkkkkkkkkkkknnnnnnnnn",
    "nnnnnnnnnkkkkkkkkkkkknnnnnnnnn",
    "nnnnnnnnnkkkkkkkkkkkknnnnnnnnn",
];

const TUFT_A_ROWS = [
    "..n...n.",
    "..n.n.n.",
    ".nn.nnn.",
    "nnnnnnnn",
];

const TUFT_B_ROWS = [
    "...m....",
    ".n.m..n.",
    ".nnmn.n.",
    "nnnnnnnn",
];

const ROCK_ROWS = [
    "..mmm...",
    ".mnnnm..",
    "mnnnnnm.",
    "nnnnnnnn",
];

const FLOWERS_ROWS = [
    ".g...s..",
    "gkg.sks.",
    ".n...n..",
    ".n.n.n..",
    "nnnnnnn.",
];

const BUSH_ROWS = [
    "...mmmm.....",
    ".mmnnnnmm...",
    "mnnnnnnnnm..",
    "nnnnnnnnnnn.",
    "nnnnnnnnnnnn",
];

const SPROUT_ROWS = [
    ".s.s.",
    ".ss..",
    "..s..",
    "mnnnm",
];

const FLAG_UP_ROWS = [
    "PFFFFFF.",
    "PFFFFFFF",
    "PFFFFFF.",
    ...repeatRow(FLAG_POLE_ROW, 6),
    "PP......",
];

const FLAG_WAVE_ROWS = [
    "PFFFFFFF",
    "PFFFFFF.",
    "PFFFFFFF",
    ...repeatRow(FLAG_POLE_ROW, 6),
    "PP......",
];

const FLAG_DOWN_ROWS = [
    ...repeatRow(FLAG_POLE_ROW, 6),
    "PFFFFFF.",
    "PFFFFFFF",
    "PFFFFFF.",
    "PP......",
];

const MINI_RABBIT_ROWS = [
    "...L.L..",
    "...L.L..",
    "..LLLL..",
    ".LLLLEL.",
    "LLLLLLL.",
    ".LLLLLL.",
    "..L..L..",
];

const MINI_CARROT_ROWS = [
    ".L.L..",
    "LL.LL.",
    ".LLL..",
    "..L...",
    ".OOO..",
    ".OSO..",
    "..O...",
];

const BURIED_CARROT_ROWS = [
    "......L....L......",
    ".....LL...LL..L...",
    ".L...LHL.LHL.LL...",
    ".LL..LHL.LHLLHL...",
    "..LL.LHLLLHLHL....",
    "...LLLHLLHLLL.....",
    "....LLLHLHLL......",
    ".....LLLHLL.......",
    "......LLHL........",
    ".....OOOOOOO......",
    ".....OSOOOSO......",
    ".....OOOSOOO......",
    "....OOOOOOOOO.....",
    "..DDOSOOOOSODD....",
    ".DDDDDDDDDDDDDDD..",
];

export {
    BURIED_CARROT_ROWS,
    BURROW_ROWS,
    BUSH_ROWS,
    FINISH_ROWS,
    FLAG_DOWN_ROWS,
    FLAG_UP_ROWS,
    FLAG_WAVE_ROWS,
    FLOWERS_ROWS,
    MINI_CARROT_ROWS,
    MINI_RABBIT_ROWS,
    ROCK_ROWS,
    SIGN_START_ROWS,
    SPROUT_ROWS,
    TUFT_A_ROWS,
    TUFT_B_ROWS,
};
