import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

let Email = localStorage.getItem('email');

const hubConnection = new HubConnectionBuilder()
  .withUrl(`http://localhost:5036/chat?email=${Email}`).configureLogging(LogLevel.Information)
  .build();

export const startHubConnection = async () => {
  try {
    await hubConnection.start();
    console.log('SignalR connected!');
  } catch (error) {
    console.error('SignalR connection error:', error);
  }
};

export default hubConnection;
