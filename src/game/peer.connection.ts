import { Subject } from 'rxjs';
import Peer from 'peerjs';
import { PeerData, User } from './type';

/* type SetPlayer = (id: string) => void
type MakePeerConnection = (remotePlayerId: string, playerId?: string, player?: User) => void */

export class PeerConnection {
  private peer: Peer;
  public onOpenConnection = new Subject<string>();
  public onPeerConnection = new Subject<void>();
  private peerConnection!: Peer.DataConnection;
  private connection!: Peer.DataConnection
  public onData = new Subject();
  public peerId!: string;
  public userId!: string;

  constructor () {
    this.peer = new Peer();

    this.peer.on('open', (id: string) => {
      if (!this.userId) {
        this.onOpenConnection.next(id)
      }
      this.userId = id;
    });

    this.peer.on('connection', (conn) => {
      this.connection = conn;
      console.log('connect');
      this.connection.on('open', () => {
        console.log('open');
        this.connection.on('data', (data: PeerData) => {
          console.log('data recived', data);
          this.onData.next(data)
        })
      });
    })
  }

  public makePeerConnection(id: string) {
    console.log('peer connection');
    this.peerConnection = this.peer.connect(id)

    this.onPeerConnection.next();
  }

  public sendData(data: Record<any, any>) {
    console.log('send data');
    this.peerConnection.on('open', () => {
      this.peerConnection.send(data);
    })
  }
}
