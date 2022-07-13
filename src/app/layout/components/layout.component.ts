import { Component, HostListener } from '@angular/core'
import { NbSidebarState } from '@nebular/theme'

enum NbSidebarStates {
  COLLAPSED = 'collapsed',
  EXPANDED = 'expanded',
  COMPACTED = 'compacted',
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  toggleSidebar = false
  state: NbSidebarState = window.innerWidth < 768 ? 'compacted' : 'expanded'
  responsive: boolean = true
  compactedBreakpoints = ['md', 'lg']
  collapsedBreakpoints = ['xs', 'is', 'sm']

  logoColor: string = window.innerWidth < 768 ? 'red' : 'white'
  isMobile = window.innerWidth < 768 ? true : false
  isSubheader = window.innerWidth > 1200 ? true : false
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 768
    this.isSubheader = event.target.innerWidth < 1200 ? true : false
    if (this.isMobile) {
      this.logoColor = 'red'
    } else {
      this.logoColor = 'white'
    }
  }

  handleRouteChange(state: NbSidebarState) {
    if (state) {
      this.state = state
    }
  }

  toggleSidebarState() {
    if (this.state === NbSidebarStates.COLLAPSED) {
      this.state = NbSidebarStates.EXPANDED
    } else if (this.state === NbSidebarStates.EXPANDED) {
      this.state = NbSidebarStates.COLLAPSED
    } else if (this.state === NbSidebarStates.COMPACTED) {
      this.state = NbSidebarStates.COLLAPSED
    }
  }

  toggleCompactMenu() {
    if (this.state === NbSidebarStates.COLLAPSED) {
      if (this.isMobile) {
        this.state = NbSidebarStates.EXPANDED
      } else {
        this.state = NbSidebarStates.COMPACTED
      }
    } else if (this.state === NbSidebarStates.EXPANDED) {
      if (this.isMobile) {
        this.state = NbSidebarStates.COLLAPSED
      } else {
        this.state = NbSidebarStates.COMPACTED
      }
    } else if (this.state === NbSidebarStates.COMPACTED) {
      if (this.isMobile) {
        this.state = NbSidebarStates.COLLAPSED
      } else {
        this.state = NbSidebarStates.EXPANDED
      }
    }
  }
}
