import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue color for primary elements
    },
    secondary: {
      main: '#f50057', // Pink for secondary elements
    },
    background: {
      default: '#f5f5f5', // Light background
      paper: '#ffffff', // White background for cards, dialogs, etc.
    },
    text: {
      primary: '#333333', // Dark gray for text
      secondary: '#555555', // Lighter gray for secondary text
    },
  },
  shape: {
    borderRadius: 0, // Sharp corners
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Simple, readable font
    fontSize: 12, // Smaller font size for data density
    h1: { fontSize: '1.8rem', fontWeight: 700 },
    h2: { fontSize: '1.5rem', fontWeight: 600 },
    h3: { fontSize: '1.3rem', fontWeight: 500 },
    h4: { fontSize: '1.1rem', fontWeight: 500 },
    h5: { fontSize: '1rem', fontWeight: 400 },
    h6: { fontSize: '0.9rem', fontWeight: 400 },
    body1: { fontSize: '0.875rem' },
    body2: { fontSize: '0.75rem' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // No uppercase text for buttons
          padding: '6px 12px', // Reduce button padding
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '12px', // Reduce card padding for data density
          boxShadow: 'none', // Minimal shadow
          border: '1px solid #e0e0e0', // Subtle border
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'collapse', // Make tables denser
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '6px 12px', // Reduce padding for table cells
        },
      },
    },
  },
});

export default theme;
