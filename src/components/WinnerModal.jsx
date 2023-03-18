import { Square } from "./Square"

export default function WinnerModal({ winner, restartGame }) {
    
    const winnerText = winner === false ? 'Draw' : 'The winner is: '

    if (winner === null) return null
    return (
        <section className='winner'>
          <div className='text'>
            <h2>
              {winnerText}
            </h2>

            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={restartGame}>Play Again</button>
            </footer>
          </div>
        </section>
    )
}