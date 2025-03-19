export default function NavBar() {
    return (
        <div className="flex-1 w-svw flex gap-8 overflow-hidden py-8 px-16">

            <div className="join custom-join join-vertical scroll-hidden overflow-visible w-3xs">
                <div className="collapse collapse-arrow join-item bg-base-100 border-base-300 border">
                    <input type="radio" name="my-accordion-4" defaultChecked />
                    <div className="collapse-title font-semibold">Lobby</div>

                    <div className="collapse-content">
                        <div className="dropdown dropdown-right dropdown-end">
                            <div tabIndex={0} role="button" className="btn rounded-md">Click</div>

                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-base-100 p-6 rounded-xl">
                Video Content
            </div>
            
        </div>
    );
}