import styled from "styled-components";

// Container for the whole History section
export const HistoryContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

// Title of the History section
export const HistoryTitle = styled.h1`
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;
`;

// Styled list for names
export const NameList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 300px; /* Define the maximum height */
  overflow-y: auto; /* Enable vertical scroll when content overflows */
  overflow-x: hidden; /* Disable horizontal scroll */
`;

// Styled list items with hover effect
export const NameItem = styled.li`
  background-color: #fff;
  padding: 10px 15px;
  margin: 5px 0;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  color: #333;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #e1f5fe;
    transform: scale(1.02);
  }
`;

// Status text style
export const StatusText = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;
