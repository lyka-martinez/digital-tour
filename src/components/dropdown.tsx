export function Dropdown() {

    return (
        <>
            {/* Lobby */}
            <div className="collapse collapse-arrow bg-[var(--color-brnd-light)] w-70 border-transparent font-medium overflow-visible">
              <input type="radio" name="my-accordion-2" defaultChecked />

              <div className="collapse-title sm:text-[1.25rem] text-[var(--color-brnd-primary)]">Lobby</div>

              <div className="collapse-content">
                <ul className="text-[var(--color-brnd-secondary)] font-semibold flex flex-col gap-4">

                  {/* Front Office */}
                  <div className="dropdown dropdown-hover dropdown-right dropdown-center">
                    <div role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">Front Office</div>
                  </div>

                  {/* Elevator */}
                  <div className="dropdown dropdown-hover dropdown-right dropdown-center">
                    <div role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">Elevator</div>
                  </div>
                </ul>
              </div>
            </div>

            {/* Amenities */}
            <div className="collapse collapse-arrow bg-[var(--color-brnd-light)] w-70 border-transparent font-medium overflow-visible">
              <input type="radio" name="my-accordion-2" defaultChecked />

              <div className="collapse-title sm:text-[1.25rem] text-[var(--color-brnd-primary)]">Amenities</div>

              <div className="collapse-content">
                <ul className="text-[var(--color-brnd-secondary)] font-semibold flex flex-col gap-4">

                  {/* Function Room */}
                  <div className="dropdown dropdown-hover dropdown-right dropdown-center">
                    <div role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">Function Room</div>
                  </div>

                  {/* Swimming Pool */}
                  <div className="dropdown dropdown-hover dropdown-right dropdown-center">
                    <div role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">Swimming Pool</div>
                  </div>

                  {/* Jacuzzi */}
                  <div className="dropdown dropdown-hover dropdown-right dropdown-center">
                    <div role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">Jacuzzi</div>
                  </div>

                  {/* Fitness Center */}
                  <div className="dropdown dropdown-hover dropdown-right dropdown-center">
                    <div role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">Fitness Center</div>
                  </div>

                  {/* Game Room */}
                  <div className="dropdown dropdown-hover dropdown-right dropdown-center">
                    <div role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">Game Room</div>
                  </div>

                  {/* Mini Golf */}
                  <div className="dropdown dropdown-hover dropdown-right dropdown-center">
                    <div role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">Mini Golf</div>
                  </div>

                  {/* Children's Playground */}
                  <div className="dropdown dropdown-hover dropdown-right dropdown-center">
                    <div role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">Children's Playground</div>
                  </div>
                </ul>
              </div>
            </div>

            {/* Room */}
            <div className="collapse collapse-arrow bg-[var(--color-brnd-light)] w-70 border-transparent font-medium overflow-visible">
              <input type="radio" name="my-accordion-2" defaultChecked />

              <div className="collapse-title sm:text-[1.25rem] text-[var(--color-brnd-primary)]">Rooms</div>

              <div className="collapse-content">
                <ul className="text-[var(--color-brnd-secondary)] font-semibold flex flex-col gap-4">

                  {/* Classic */}
                  <div className="dropdown dropdown-hover dropdown-right dropdown-center">
                    <div tabIndex={0} role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">Classic</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                      <li className="rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]"><a>Queen</a></li>
                      <li className="rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]"><a>Twin</a></li>
                    </ul>
                  </div>

                  {/* Deluxe */}
                  <div className="dropdown dropdown-hover dropdown-right dropdown-center">
                    <div tabIndex={0} role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">Deluxe</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                      <li className="rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]"><a>Queen</a></li>
                      <li className="rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]"><a>Twin</a></li>
                    </ul>
                  </div>

                  {/* Premium */}
                  <div className="dropdown dropdown-hover dropdown-right dropdown-center">
                    <div tabIndex={0} role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">Premium</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                      <li className="rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]"><a>Queen</a></li>
                      <li className="rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]"><a>Twin</a></li>
                    </ul>
                  </div>

                  {/* Suite */}
                  <div className="dropdown dropdown-hover dropdown-right dropdown-center">
                    <div role="button" className="btn text-base bg-transparent text-[var(--color-brnd-secondary)] p-2 w-full border border-[var(--color-brnd-muted)] rounded-[8px] hover:bg-[var(--color-brnd-primary)] hover:text-[var(--color-brnd-light)]">Suite</div>
                  </div>
                </ul>
              </div>
            </div>
        </>
    )
} 