import styled from "styled-components";

// Container for the whole History section
export const HistoryContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

// Title of the History section
export const HistoryTitle = styled.h1`
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;
  margin-left: 14px;
`;

// Styled list for names
export const NameList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 300px; /* Define the maximum height */
  overflow-y: auto; /* Enable vertical scroll when content overflows */
  overflow-x: hidden; /* Disable horizontal scroll */
  p{
    margin-left: 14px;
  }
`;

// Styled list items with hover effect
export const NameItem = styled.li`
  background-color: #fff;
  margin: 5px 15px;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #e1f5fe;
    transform: scale(1.005);
  }
`;

// Status text style
export const StatusText = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;

export const TableContainer = styled.div`
    width: 100%;
    margin: 20px auto;
    background-color: #232625;
    border-radius: 8px;
    overflow: hidden;
`;

export const TableWrapper = styled.div`
    overflow-y: auto; 
`;

export const TableRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const TableCell = styled.div`
    padding-block: 12px;
    width: 20.6%;
    display: flex;
    justify-content: center;
`;

export const HeaderTable = styled.div`
  margin: 5px 15px;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  transition: background-color 0.3s ease, transform 0.3s ease;
  background-color: #05A6CB;
  color: white;
`